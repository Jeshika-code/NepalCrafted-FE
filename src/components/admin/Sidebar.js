import React from 'react'
import "./Sidebar.css";
import logo from ".././../logo-color1.png";
import { Link } from "react-router-dom";
import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";

const Sidebar = () => {
  return (
    <div className="sidebar ">
    {/* <Link to="/" className='p-0 '>
      <img src={logo} alt="Ecommerce" className='w-full ' />
    </Link> */}
    <Link to="/admin/dashboard" className='text-grey p-4'>
        <p className='flex items-center'>
          <DashboardIcon /> Dashboard
        </p>
      </Link>
      <Link className='text-grey p-4' >
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ImportExportIcon />}
        >
          <TreeItem nodeId="1" label="Products">
            <Link to="/admin/products" className='text-grey p-4' >
              <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
            </Link>

            <Link to="/admin/product" className='text-grey p-4' >
              <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
            </Link>
          </TreeItem>
        </TreeView>
      </Link>

      <Link to="/admin/orders" className='text-grey p-4'>
        <p className='flex items-center'>
          <ListAltIcon />
          Orders
        </p>
      </Link>
      <Link to="/admin/users" className='text-grey p-4'>
        <p className='flex items-center'>
          <PeopleIcon /> Users
        </p>
      </Link>
      <Link to="/admin/reviews" className='text-grey p-4'>
        <p className='flex items-center' >
          <RateReviewIcon />
          Reviews
        </p>
      </Link>
     
    </div>
  )
}

export default Sidebar