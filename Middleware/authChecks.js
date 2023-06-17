
export const registerChecks = (req,res,next) => {
    try {
        const {name, email , password, confirmPassword} = req.body;
        if(!name) return res.send("Name is required.");
        if(!email) return res.send("Email is required.");
        if(!password) return res.send("Password is required");
        if(!confirmPassword) return res.send("Confirm Passrod is required");
        next();
    } catch (error) {
        return res.send(error);
    }
}