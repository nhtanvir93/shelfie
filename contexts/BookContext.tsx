import React, {
  createContext,
  ReactNode,
  useCallback,
  useState
} from "react"
import { ID, Models, Query } from "react-native-appwrite"
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

export type CreateBook = Pick<Book, "title" | "author" | "description" | "userId">
export type UpdateBook = Partial<CreateBook>

type BookContextType = {
  books: Book[]
  fetchAllBooks: () => void
  fetchBookById: (bookId: string) => void
  createBook: (data: CreateBook) => Promise<CreateEntityResult>
  updateBook: (bookId: string, data: UpdateBook) => Promise<Result>
  deleteBook: (bookId: string) => Promise<Result>
}

export const BookContext = createContext<BookContextType | undefined>(undefined)

export const BookProvider = ({ children }: { children: ReactNode }) => {
  const [books, setBooks] = useState<Book[]>([])
  const {user} = useUser();

  const fetchAllBooks = useCallback(async () => {
    if(!user) {
        return setBooks([])
    }

    const response = await databases.listDocuments<Book>({
        databaseId: DATABASE_ID,
        collectionId: BOOK_COLLECTION,
        queries: [
            Query.equal('userId', user.$id)
        ]
    })

    const allBooks = response.documents
    setBooks(allBooks)
  }, [books])

  const fetchBookById = useCallback(
    async (bookId: string) => {
      const book = await databases.getDocument<Book>({
        databaseId: DATABASE_ID,
        collectionId: BOOK_COLLECTION,
        documentId: bookId
      })

      setBooks([book])
    },
    [books]
  )

  const createBook = useCallback(async (data: CreateBook): Promise<CreateEntityResult> => {
    try {
      const book = await databases.createDocument<Book>({
        databaseId: DATABASE_ID,
        collectionId: BOOK_COLLECTION,
        documentId: ID.unique(),
        data
      })

      return { success: true, documentId: book.$id }
    } catch (error) {
      return {
        success: false,
        message: "Failed to create book"
      }
    }
  }, [])

  const updateBook = useCallback(
    async (bookId: string, data: UpdateBook): Promise<Result> => {
      try {
        await databases.updateDocument<Book>({
        databaseId: DATABASE_ID,
        collectionId: BOOK_COLLECTION,
        documentId: bookId,
        data
      })

      return { success: true }

      } catch (error) {
        return {
          success: false,
          message: "Failed to update book"
        }
      }
    },
    []
  )

  const deleteBook = useCallback(async (bookId: string): Promise<Result> => {
    try {
        await databases.deleteDocument({
            databaseId: DATABASE_ID,
            collectionId: BOOK_COLLECTION,
            documentId: bookId
        })

        return { success: true }
    } catch (error) {
      return {
        success: false,
        message: "Failed to delete book"
      }
    }
  }, [])

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