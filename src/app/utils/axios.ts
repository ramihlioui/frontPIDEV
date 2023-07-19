import ax from "axios"
export const axios = ax.create({
    baseURL: "http://localhost:8080",
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
})