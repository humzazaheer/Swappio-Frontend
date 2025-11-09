const Logout = () => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/logout`, {
        method: "GET",
        credentials: "include"
    })
        .then(res => {
            if (!res.ok) throw new Error("Not authenticated");
            return res.json();
        })
        .then(data => console.log(data))
        .catch(err => console.error(err));
}
export default Logout;
