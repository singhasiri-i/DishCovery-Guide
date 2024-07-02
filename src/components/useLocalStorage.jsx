import { useState } from "react"

export const useLocalStorage = (key) => {

    const getInitailLocalStorage = () => {
        const local = window.localStorage.getItem(key)
        if (!local) {
            return []
        }
        const data = JSON.parse(local)
        return data
    }
    
    const [favorite, setFavorite] = useState(getInitailLocalStorage)


    const setItem = (favorite) => {
        const oldData = getInitailLocalStorage()
        const newData = [...oldData, favorite]
        window.localStorage.setItem(key, JSON.stringify(newData))
        setFavorite(newData)
    }

    const removeFromFavorite = (idMeal) => {
        const updatedFavorite = favorite.filter((favItem) => favItem.idMeal !== idMeal)
        window.localStorage.setItem(key, JSON.stringify(updatedFavorite))
        setFavorite(updatedFavorite)
    }

    return { setItem, favorite, removeFromFavorite }
}
