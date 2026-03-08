export type Result = {
    success: true
} | {
    success: false,
    message: string
}

export type CreateEntityResult = {
    success: true,
    documentId: string
} | {
    success: false,
    message: string
}