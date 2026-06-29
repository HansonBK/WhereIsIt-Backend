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

async function getAllProperties(userId) {
    
    try {

        return await prisma.property.findMany({
            where:{
                userId : userId
            }
        });
        
    } catch (error) {
        console.error("Error fetching properties!: ", error);
        throw error;
        
    }
}

async function getpropertyById(propertyId, userId) {
    try {
        const property =  await prisma.property.findUnique({
            where:{
                id : propertyId
            }
        });
        if (!property || property.userId !== userId) {
            return null; 
        }
        return property;

    } catch (error) {
        console.error("Error fetching property: ", error);
        throw error;
    }
}

async function updateProperty(propertyId, userId,updateData) {
    
    try {
        const property = await getpropertyById(propertyId, userId);
        if(!property){
            const error = new Error("Not found or unauthorized");
            error.code = 'P2025';
            throw error;
        }

        return await prisma.property.update({
            where:{
                id: propertyId
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

        const property = await getpropertyById(propertyId, userId);
        if(!property){
            const error = new Error("Not found or unauthorized");
            error.code = 'P2025';
            throw error;
        }

        return await prisma.property.delete({
            where:{
                id: propertyId
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