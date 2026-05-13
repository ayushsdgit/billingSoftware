import axios from "axios";


export const addItem = async (formData) => {
    return await axios.post(
        "http://localhost:8088/api/v1.0/admin/items",
        formData,
        {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'multipart/form-data'
            }
        }
    );
};

// export const addItem = async (item) => {
//     return await axios.post("http://localhost:8088/api/v1.0/admin/items", item, {
//         headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}`
//         }
//     });
// };

export const deleteItem = async (itemId) => {
    return await axios.delete(`http://localhost:8088/api/v1.0/admin/items/${itemId}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
};

export const fetchItems = async () => {
    return await axios.get('http://localhost:8088/api/v1.0/items', {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
};

