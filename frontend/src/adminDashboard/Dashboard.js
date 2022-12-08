import React from 'react';
import {useEffect,useState} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { updateOverview, listOverviews} from '../actions/overviewActions'
import {
    PieChart,
    Pie,
    Tooltip,
    BarChart,
    XAxis,
    YAxis,
    Legend,
    CartesianGrid,
    Bar,
  } from "recharts";



 
const Dashboard = ({ Component } ) => {
  const dispatch = useDispatch()
  const overviewList = useSelector((state) => state.overviewList)
  const { loading, error, overviews } = overviewList

  
  const overviewUpdate = useSelector((state) => state.overviewUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = overviewUpdate

   useEffect(() => {
    dispatch(updateOverview())
        dispatch(listOverviews())
   },[
    dispatch,
  ])
    
 
    return (
    <div class="col main pt-5 mt-3">
        <h1 class="lead d-none d-sm-block" align="center"><strong><bold>OVERVIEW OF SAKA MOTORS</bold></strong></h1>
 
 
        <div class="alert alert-warning fade collapse" role="alert" id="myAlert">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">×</span>
                <span class="sr-only">Close</span>
            </button>
            <strong>Data and Records</strong> Learn more about employee
        </div>
        {overviews.map((overview) => (

        <div class="row mb-3">
            <div class="col-xl-3 col-sm-6 py-2">
                <div class="card bg-success text-white h-100">
                    <div class="card-body bg-success" style={{backgroundColor:"#57b960"}}>
                        <div class="rotate">
                            <i class="fa fa-user fa-4x"></i>
                        </div>
                        <h6 class="text-uppercase">Users</h6>
                        <h1 class="display-4">{overview.users}</h1>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-sm-6 py-2">
                <div class="card text-white bg-danger h-100">
                    <div class="card-body bg-danger">
                        <div class="rotate">
                            <i class="fa fa-list fa-4x"></i>
                        </div>
                        <h6 class="text-uppercase">Posts</h6>
                        <h1 class="display-4">{overview.posts}</h1>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-sm-6 py-2">
                <div class="card text-white bg-info h-100">
                    <div class="card-body bg-info">
                        <div class="rotate">
                          <i class="fa fa-archive fa-4x"></i>
                        </div>
                        <h6 class="text-uppercase">Products</h6>
                        <h1 class="display-4">{overview.products}</h1>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-sm-6 py-2">
                <div class="card text-white bg-warning h-100">
                    <div class="card-body">
                        <div class="rotate">
                            <i class="fa fa-cart-arrow-down fa-4x"></i>
                        </div>
                        <h6 class="text-uppercase">Orders</h6>
                        <h1 class="display-4">{overview.orders}</h1>
                    </div>
                </div>
            </div>
        </div>
        
        
 ))}
        <hr/>
        <div>
        {overviews.map((overview) => (
        <div className="Dashb" style={{ textAlign: "center" }}>
          <BarChart
          width={600}
          height={400}
          data={[
            { name: "Users", Overall: overview.users },
            { name: "Managers", Overall: overview.managers },
            { name: "Mechanics", Overall: overview.mechanics },
            { name: "Posts", Overall: overview.posts },
       ] }
          margin={{
            top: 5,
            right: 50,
            left: 20,
            bottom: 5,
          }}
          barSize={30}
        >
          <XAxis
            dataKey="name"
            scale="point"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="Overall" fill="#03BFD1" background={{ fill: "#eee" }} />
        </BarChart>
        <PieChart width={400} height={400}>
          <Pie
            dataKey="users"
            isAnimationActive={false}
            data={[
                { name: "Products", users: overview.products },
                { name: "Orders", users: overview.orders },
                { name: "Bookings", users: overview.books },
                { name: "Auction", users: overview.auctions },
           ] }
            cx={200}
            cy={200}
            outerRadius={150}
            fill="#03BE31"
            label
          />
          <Tooltip />
        </PieChart>
        
      </div>
       ))}
        </div>

    </div>
    )
}
 
export default Dashboard