import { Link } from "react-router-dom";

import 'react-toastify/dist/ReactToastify.css';
import { DataGrid } from "@mui/x-data-grid";
import { FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";


const Users = () => {
  const [data, setData] = useState([]);
  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    { field: "fullname", headerName: "Full Name", width: 200 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "age", headerName: "Age", type: "number", width: 100 },
    { field: 'country', headerName: 'Country', width: 150 },
    { field: "address", headerName: "Address", width: 200 },
    {
      field: "delete",
      headerName: "Delete",
      width: 100,
      renderCell: (params) => {
        return (
          <>
            <FaTrash className="text-red-500 cursor-pointer m-2" onClick={() => handleDelete(params.row._id)} />
          </>
        );
      },
    },
  ];

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await publicRequest.get("/users");

        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getUsers();
  }, []);

  // const handleDelete = async(id) => {
  //   try{
  //     await publicRequest(/users/${id});
  //     window.location.reload();


  //   } catch(error) {
  //     console.log(error)
  //   }
  // }


  const handleDelete = async (id) => {
    try {
      // Sending DELETE request to backend
      await publicRequest.delete(`/users/${id}`);
      
      // Optimistically update UI (or use window.location.reload() to force reload)
      setData(data.filter((item) => item._id !== id)); 
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div className="m-[30px] bg-[#fff] p-[20px]">
      <div className="flex items-center justify-between">
        <h1 className="m-[20px] text-[20px]">All Users</h1>
        <Link to="/home/newuser">
          <button className="bg-[#1e1e1e] text-white p-[10px] cursor-pointer">
            New User
          </button>
        </Link>
      </div>
      <DataGrid 
      rows={data} 
      columns={columns} 

      getRowId={(row) => row._id}
      checkboxSelection />
    </div>
  );
};

export default Users;