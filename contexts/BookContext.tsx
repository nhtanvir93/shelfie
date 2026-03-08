import React, { createContext, ReactNode, useEffect, useState } from "react"
import {
  AppwriteException,
  ID,
  Models,
  Permission,
  Query,
  Role
} from "react-native-appwrite"

import { CreateEntityResult, Result } from "../constants/Result"
import { BOOK_COLLECTION, DATABASE_ID } from "../constants/Database"
import { databases } from "../lib/appwrite"
import useUser from "../hooks/useUser"

export type Book = Models.Document & {
  title: string
  author: string
  description: string
  userId: string
}

export type CreateBook = Pick<Book, "title" | "author" | "description">
export type UpdateBook = Partial<CreateBook>

type BookContextType = {
  books: Book[]
  fetchAllBooks: () => Promise<void>
  fetchBookById: (bookId: string) => Promise<Book | undefined>
  createBook: (data: CreateBook) => Promise<CreateEntityResult>
  updateBook: (bookId: string, data: UpdateBook) => Promise<Result>
  deleteBook: (bookId: string) => Promise<Result>
}

export const BookContext = createContext<BookContextType | undefined>(undefined)

export const BookProvider = ({ children }: { children: ReactNode }) => {
  const [books, setBooks] = useState<Book[]>([])
  const { user } = useUser()

  const fetchAllBooks = async () => {
    if (!user) {
      setBooks([])
      return
    }

    try {
      const response = await databases.listDocuments<Book>({
        databaseId: DATABASE_ID,
        collectionId: BOOK_COLLECTION,
        queries: [Query.equal("userId", user.$id)]
      })

      setBooks(response.documents)
    } catch (error) {
      console.log("Fetch books failed", error)
    }
  }

  const fetchBookById = async (bookId: string) => {
    if (!user) return

    try {
      return await databases.getDocument<Book>({
        databaseId: DATABASE_ID,
        collectionId: BOOK_COLLECTION,
        documentId: bookId
      })
    } catch (error) {
    }
  }

  const createBook = async (data: CreateBook): Promise<CreateEntityResult> => {
    if (!user) {
      return { success: false, message: "User not authenticated" }
    }

    try {
      const book = await databases.createDocument<Book>({
        databaseId: DATABASE_ID,
        collectionId: BOOK_COLLECTION,
        documentId: ID.unique(),
        data: {
          ...data,
          userId: user.$id
        },
        permissions: [
          Permission.read(Role.user(user.$id)),
          Permission.update(Role.user(user.$id)),
          Permission.delete(Role.user(user.$id))
        ]
      })

      return { success: true, documentId: book.$id }
    } catch (error) {
      if (error instanceof AppwriteException) {
        return {
          success: false,
          message: error.response || error.message
        }
      }

      return { success: false, message: "Failed to create book" }
    }
  }

  const updateBook = async (
    bookId: string,
    data: UpdateBook
  ): Promise<Result> => {
    try {
      await databases.updateDocument<Book>({
        databaseId: DATABASE_ID,
        collectionId: BOOK_COLLECTION,
        documentId: bookId,
        data
      })

      return { success: true }
    } catch (error) {
      if (error instanceof AppwriteException) {
        return {
          success: false,
          message: error.response || error.message
        }
      }

      return { success: false, message: "Failed to update book" }
    }
  }

  const deleteBook = async (bookId: string): Promise<Result> => {
    try {
      await databases.deleteDocument({
        databaseId: DATABASE_ID,
        collectionId: BOOK_COLLECTION,
        documentId: bookId
      })

      setBooks((prev) => prev.filter((b) => b.$id !== bookId))

      return { success: true }
    } catch (error) {
      if (error instanceof AppwriteException) {
        return {
          success: false,
          message: error.response || error.message
        }
      }

      return { success: false, message: "Failed to delete book" }
    }
  }

  useEffect(() => {
    fetchAllBooks()
  }, [user])

  return (
    <BookContext.Provider
      value={{
        books,
        fetchAllBooks,
        fetchBookById,
        createBook,
        updateBook,
        deleteBook
      }}
    >
      {children}
    </BookContext.Provider>
  )
}