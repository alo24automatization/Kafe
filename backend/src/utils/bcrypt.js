import bcrypt from 'bcrypt';

export const createHash = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

export const verifyPassword = async (password, hash) => {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
} 
