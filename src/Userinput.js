import React, { useState } from "react";
import Rewardlist from "./rewardlist";


class Transaction {
    constructor(price,customer,transaction_id,date) {
        this.state = {
            price : price,
            customer : customer,
            transaction_id:transaction_id,
            rewards: CalculateRewards(price),
            transactionDate:date}
    }
}

class TransactionList {
    constructor() {
        this.list = [];
    }


    getAllTransactions() {
        return this.list.sort((a,b) => b.transactionDate-a.transactionDate);
    }

    addTransaction(xx) {
       // const transaction = new Transaction(price);
        this.list.push(xx);
    }

    getTotalRewards() {
        return this.list.length ? this.list.reduce((acc,key)=>key.rewards+acc, 0) : 0;
    }

    rewardPerMonth(customerList) {
        let finalData = [];
        customerList.map((valx,indx)=>{

            let CustomerFilter = this.list.filter(trans => trans.state.customer === valx);
            
            let last3MonthRewardsInDesc = [];
            for(let i=0; i<3; i++) 
            {
                 let filteredList = CustomerFilter.filter(trans => { let dateVal = new Date();
                                                                     dateVal.setMonth(dateVal.getMonth() - i ); 
                                                                     let monthVal = dateVal.getMonth();
                                                                     let yearVal = dateVal.getFullYear();
                                                                     return new Date(trans.state.transactionDate).getMonth() === monthVal && new Date(trans.state.transactionDate).getFullYear() ===yearVal;});
                  last3MonthRewardsInDesc[i] = filteredList.reduce((acc,key)=>key.state.rewards+acc,0);
            }

            finalData.push({customer:valx,data:last3MonthRewardsInDesc})
        });
        return finalData;
    }
}

function CalculateRewards(price) {
    if (price >=50 && price <= 100) {
        return price-50;
    } else if (price >100){
        return (2*(price-100) + 50);
    }
    return 0;
}

function DataEntry()
{
    const [transactionList,setTransactionList] = useState(new TransactionList()) ;
    const [tid,setTid] = useState(0);
    const [customer,setCustomer] = useState("");
    const [price,setPrice] = useState(0);
    const [date,setDate] = useState("");
    const [customerList,setCustomerList] = useState([]);
    const [message,setMessage] = useState("");

    const addTransaction=()=>{

        if (tid == 0){
            setMessage(" Please enter Transaction ID")
        }else if (customer==""){
            setMessage(" Please enter Customer Name")
        }else if (price==0){
            setMessage(" Please enter Price")
        }else if (date==""){
            setMessage(" Please enter date")
        }else{
            setMessage("")
            const transaction = new Transaction(price,customer,tid,date);
            setTransactionList(transactionList,transactionList.addTransaction(transaction));
            setTid(0);
            setCustomer("");
            setPrice("");
            setDate("");
            if (!customerList.includes(customer)){
                customerList.push(customer);
            }
            console.log(customerList)
    
            console.log("Monthwise");
            console.log(transactionList.rewardPerMonth(customerList));
        }

       

    }    

    return(

        <div>
                <table>
                <tbody>
                    <tr><th>Transaction ID</th><th>Customer</th><th>Price</th><th>Date (MM/DD/YYYY)</th></tr>
                    <tr><th><input type="text" value = {tid} onChange={(e)=>setTid(e.target.value)}></input></th>
                        
                    <th><input type="text" value = {customer} onChange={(e)=>setCustomer(e.target.value)}></input></th>
                    <th><input type="text"  value = {price} onChange={(e)=>setPrice(e.target.value)}></input></th>
                    <th><input type="text"  value = {date} onChange={(e)=>setDate(e.target.value)}></input></th>
                    <th><button onClick={addTransaction}>Add</button></th>
                    </tr>

                </tbody>
                </table>
            {message!=""&& <div><p style={{color:'red'}}>{message}</p></div>}

            <div style={{
                   paddingTop:'10px',
                   display: 'flex',
                   flexFlow: 'row',
                   justifyContent: 'left',
                   width:'100%'}}>
                <div style={{
                   width:'50%'}}>
                    <table style={{borderCollapse: "collapse", width: "95%"}}>
                    <tbody>
                        <tr style={{backgroundColor: "#f2f2f2", padding: "8px"}}>
                            <th >Transaction ID</th>
                            <th>Customer</th>
                            <th>Price</th>
                            <th>Date</th>
                        </tr>
                     
                        {(transactionList.getAllTransactions()).map((valuex,indx)=><tr  style={{borderBottom: "1px solid #ddd"}} key={indx}><th>{valuex.state.transaction_id}</th><th>{valuex.state.customer}</th><th>{valuex.state.price}</th><th>{valuex.state.transactionDate}</th></tr>)}
                    
                        </tbody>
                    </table>
                </div>
                <Rewardlist transactionlist={transactionList} customerlist={customerList} ></Rewardlist>
            </div>

        </div>
    )

}


export default DataEntry;
