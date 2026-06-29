const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');

const adapter = new PrismaPg({ 
    connectionString: process.env.DATABASE_URL 
});
const prisma = new PrismaClient({adapter}); 

async function createProperty(name, userId) {
    
    try {
        
        return await prisma.property.create({
            data:{
                name: name,
                userId : userId
            }
        });

    } catch (error) {
        console.error("Error Createing property: ", error);
        throw error;
    }
}

module.exports = {
    createProperty,
 
};