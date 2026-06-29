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

async function getAllProperties() {
    
    try {

        return await prisma.property.findMany();
        
    } catch (error) {
        console.error("Error fetching properties!: ", error);
        throw error;
        
    }
}

async function getpropertyById(propertyId) {
    try {
        return await prisma.property.findUnique({
            where:{
                id : propertyId
            }
        }) 

    } catch (error) {
        console.error("Error fetching property: ", error);
        throw error;
    }
}

async function updateProperty(propertyId, updateData) {
    
    try {
        return await prisma.property.update({
            where:{
                id: userId
            },
            data: updateData
        })
    } catch (error) {
        console.error("Error updating property: ", error);
        throw error;
    }
}

async function deleteProperty(propertyId) {

    try {
        return await prisma.property.delete({
            where:{
                id: userId
            }
        })
    } catch (error) {
        console.error("Error deleting property: ", error);
        throw error;
    }
}

module.exports = {
    createProperty,
    getAllProperties,
    getpropertyById,
    updateProperty,
    deleteProperty
};