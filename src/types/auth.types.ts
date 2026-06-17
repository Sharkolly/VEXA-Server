export type USERSIGNUPTODBTYPE = {
    email: string,
    hashedPassword: string
    firstName: string
    lastName: string
}
export type ADMINSIGNUPTODBTYPE = {
    email: string,
    hashedPassword: string
    firstName: string
    lastName: string
    category: string
    businessName: string
    
}

export type RETURNTYPE_USERSIGNUPTODBTYPE = Promise<{
    userIdToString: string     
}>
export type RETURNTYPE_ADMINSIGNUPTODBTYPE = Promise<{
    adminIdToString: string     
}>