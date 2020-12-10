export class GlobalConstants {
    // public static loggedId = sessionStorage.getItem("loggedUserId");

    public static showLibrarireanFunc(): boolean {
        return sessionStorage.getItem("userRole") == "librarian";
    }
    public static getLoggedUser() {
        return +sessionStorage.getItem("loggedUserId");
    }
    
}
