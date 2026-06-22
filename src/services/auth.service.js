const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const bcrypt = require('bcrypt');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });




async function register(email, password, name){

const hashedPassword = await bcrypt.hash(password, 10);

    try {
        
        const newUser = await prisma.user.create({
            data: {
                email : email,
                password: hashedPassword,
                name: name
            }
        });
        return newUser;

    } catch (error) {
        console.error("Error db: ", error);
        throw error;
    }

}




function HelloMessage() {
    return "Hello Funcion!";
}

module.exports = {
    HelloMessage,
    register
};