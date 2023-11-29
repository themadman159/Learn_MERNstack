//เก็บ token , username ลงใน session storage

export const auth = (response, next) => {
    if(window !== "undefined") {
        //เก็บข้อมูลลง session storage
        sessionStorage.setItem("token",JSON.stringify(response.data.token))
        sessionStorage.setItem("user",JSON.stringify(response.data.username))
    }
    next()
}

//ดึงข้อมูล token ที่ทำการ login มาใช้
export const getToken = () => {
    if(window !== "undefined") {
        if( sessionStorage.getItem("token")){
            return JSON.parse(sessionStorage.getItem("token"))
        } else {
            return false
        }
    }
}

//ดึงข้อมูล username ที่ทำการ login มาใช้
export const getUser = () => {
    if(window !== "undefined") {
        if( sessionStorage.getItem("user")){
            return JSON.parse(sessionStorage.getItem("user"))
        } else {
            return false
        }
    }
}

//logout
export const logout = (next) => {
    if(window !== "undefined"){
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("user")
    }
    next()
}