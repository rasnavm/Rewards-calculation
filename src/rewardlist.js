import React from 'react'

function Rewardlist(props) {
  return (
    
    <div style={{
        width:'50%'}}>
             <table style={{borderCollapse: "collapse", width: "100%"}}>
                     <tr style={{backgroundColor: "#04AA6D" , padding: "8px"}}><th>Customer</th>
                     <th>Current Month</th>
                     <th>Last Month</th>
                     <th>2 Month Back</th>
                     <th>Total</th>
                     </tr>
              {props.transactionlist.rewardPerMonth(props.customerlist).map((val,ind)=>
             <tr style={{borderBottom: "1px solid #ddd"}} key={val.customer}>
                     <th>{val.customer}</th>
                     <th>{val.data[0]}</th>
                     <th>{val.data[1]}</th>
                     <th>{val.data[2]}</th>
                     <th>{val.data[0]+val.data[1]+val.data[2]}</th>
                 </tr>
          )}
          </table> 
     </div> 
  )
}

export default Rewardlist;