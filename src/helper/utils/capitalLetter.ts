

export function capitalizeFLetter(item: string) { 
    return item?.charAt(0).toUpperCase() + item?.slice(1).toLowerCase()
}