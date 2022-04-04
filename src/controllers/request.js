import { useResolvedPath } from 'react-router-dom';
import Request from '../models/request';

// create request
// get request
// update request
// delete request
//get all requests 
export const getAllRequests = async () => {
    try {
        const request = await Request.find();
        if (request) return request;
        const error = new Error ('Not found');
        error.code = 500;
        throw error;
    } catch (error) {
        console.log(error);
        throw error;
    }
}