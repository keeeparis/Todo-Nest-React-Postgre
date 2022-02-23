export const toCapitalFirstLetter = (word: string) => word[0].toUpperCase() + word.substring(1)

export const converLongContentShort = (content: string) => {
    return (content.length > 100) ? `${content.substring(0, 100)}...` : content
}