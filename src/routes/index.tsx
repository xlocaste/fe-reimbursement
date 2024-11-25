import { Route, Routes } from "react-router-dom";
import Login from "../Auth/Login"
import ReimbursementList from "../reimbursement/list";
import EditReimbursement from "../reimbursement/edit";
import AddReimbursement from "../reimbursement/add";
import '../index.css'

function RoutesIndex() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/reimbursement" element={<ReimbursementList />} />
            <Route path="/reimbursement/add" element={<AddReimbursement />} />
            <Route path="/reimbursement/:id" element={<EditReimbursement />} />
        </Routes>
    )
}

export default RoutesIndex