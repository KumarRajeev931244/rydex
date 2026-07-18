"use client"
import axios from "axios";
import { useEffect, useState } from "react";

type Earning={
    date:string,
    earnings:number
}
function AdminEarning() {
    const [earningData, setEarningData] = useState<>();
    useEffect(() => {
        const fetchEarning = async()=>{
            try {
                const {data} = await axios.get("/api/admin/earning")
                console.log("admin earning:",data);
            } catch (error) {
                console.log(error);
                
            }
        }
        fetchEarning()
    }, []);
    return ( 
       <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 w-full">
        <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
            <div>
                <span className="inline-block text-[11px] font-semibold tracking-widest uppercase text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-2">Admin Dashboard</span>
                <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                    Daily Earnings
                </h2>
                <p className="text-sm text-gray-400 mt-0.5">
                    Last 7 days performance 
                </p>
            </div>
            <div className="text-right"></div>
        </div>
       </div>
     );
}

export default AdminEarning;