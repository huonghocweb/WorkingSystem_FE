import { UserResponse } from "@/src/types/user"
import Link from "next/link";

interface UserTableProps {
  users : UserResponse[];
}

export default function UserListTable({users} : UserTableProps) { 
// console.log(users);
    return (  
        <>
  <div className="table-container">
    <table>
      <thead>
        <tr>
          <th>No.</th>
          <th>UserName</th>
          <th>FullName</th>
          <th>PhoneNumber</th>
          <th>Gender</th>
          <th>Status</th>
          <th colSpan={2}>Action</th>
        </tr>
      </thead>
      <tbody>
        {
          users.map((user, index) => (
        <tr key={index}>
          <td>
            <div style={{ fontWeight: 500 }}>#{index}</div>
            {/* <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
              Main dashboard
            </div> */}
          </td>
          <td>{user.userName}</td>
          <td>{user.lastName} {user.firstName}</td>
          <td>{user.phoneNumber}</td>
          <td>{user.gender === 1 ? 'Male': 'Female'}</td>
          <td>{user.email}</td>
          <td> <Link className="btn btn-primary"  href={`/users/${user.userId}`}><i className="fa-solid fa-eye"></i></Link>
            <Link style={{marginLeft : "10px"}} className="btn btn-primary"  href={`/users/${user.userId}`}><i className="fa-solid fa-eye"></i></Link>
           </td>
          {/* <td><span className="badge badge-red">+12.4%</span></td> */}
        </tr>
          ))
        }


      </tbody>
    </table>
  </div>
        </>
    )
}