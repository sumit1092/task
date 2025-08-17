// import { useEffect, useState } from "react"
// import TaskDataTable from "./TaskDataTable"

// const MyTask = () =>{
//   const [Country, setCountry] = useState([])
//   const [filtered, setFiltered] = useState([])
//   const [search, setSearch] = useState("")

//   const getCountries = async () => {
//     try{
//       const res = await fetch("https://jsonplaceholder.typicode.com/users")
//       const data = await res.json()
//       console.log("data",data)
//       setCountry(data) 
//     }catch(err){
//       console.log("error =>",err)
//     }
//   } 

//   useEffect(()=>{
//     const result = Country.filter((x)=>{
//       return x.name.toLowerCase().match(search.toLowerCase())
//     })
//     setFiltered(result)
//   },[search])

//   useEffect(()=>{
//     getCountries();
//   },[])


//   return(
//     <>
//      <div className="d-flex flex-column align-items-center">
//     </div>
//       <TaskDataTable Country={Country} filtered = {filtered} setSearch = {setSearch} search={search}/>
//     </>
//   )
// }

// export default MyTask
import { useEffect, useState } from "react";
import TaskDataTable from "./TaskDataTable"

const MyTask = () => {
  const [Country, setCountry] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  const getCountries = async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await res.json();
      setCountry(data);
      setFiltered(data); 
    } catch (err) {
      console.log("error =>", err);
    }
  };

  useEffect(() => {
    const result = Country.filter((x) =>
      x.name.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(result);
  }, [search, Country]);

  useEffect(() => {
    getCountries();
  }, []);

  return (
    <>
      <TaskDataTable
        Country={Country}
        filtered={filtered}
        setSearch={setSearch}
        search={search}
      />
    </>
  );
};

export default MyTask;
