// import React from 'react'
// import { Link } from 'react-router-dom'
// import { FiMoreVertical } from 'react-icons/fi'
// import { crmStatisticsData } from '@/utils/fackData/crmStatisticsData'
// import getIcon from '@/utils/getIcon'


// const SiteOverviewStatistics = () => {
//     return (
//         <>
//             {
//                 crmStatisticsData.map(({ id, completed_number, progress, progress_info, title, total_number, icon }) => (
//                     <div key={id} className="col-xxl-3 col-md-6">
//                         <div className="card stretch stretch-full short-info-card">
//                             <div className="card-body">
//                                 <div className="d-flex align-items-start justify-content-between mb-4">
//                                     <div className="d-flex gap-4 align-items-center">
//                                         <div className="avatar-text avatar-lg bg-gray-200 icon">
//                                             {React.cloneElement(getIcon(icon), { size: "16" })}
//                                         </div>
//                                         <div>
//                                             <div className="fs-4 fw-bold text-dark">
//                                                 <span className="counter">{completed_number ? completed_number + "/" : ""}</span>
//                                                 <span className="counter">{total_number}</span>
//                                             </div>
//                                             <h3 className="fs-13 fw-semibold text-truncate-1-line">{title}</h3>
//                                         </div>
//                                     </div>
//                                     <Link to="#" className="lh-1">
//                                         <FiMoreVertical className='fs-16' />
//                                     </Link>
//                                 </div>
//                                 <div className="pt-4">
//                                     <div className="d-flex align-items-center justify-content-between">
//                                         <Link to="#" className="fs-12 fw-medium text-muted text-truncate-1-line">{title}</Link>
//                                         <div className="w-100 text-end">
//                                             <span className="fs-12 text-dark">{progress_info}</span>{" "}
//                                             <span className="fs-11 text-muted">({progress})</span>
//                                         </div>
//                                     </div>
//                                     <div className="progress mt-2 ht-3">
//                                         <div className={`progress-bar progress-${id}`} role="progressbar" style={{ width: progress }}></div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 ))
//             }
//         </>
//     )
// }

// export default SiteOverviewStatistics


import React from 'react'
import ReactApexChart from 'react-apexcharts'
import { tasksOverviewChartOption } from '@/utils/chartsLogic/tasksOverviewChatOption'
import getIcon from '@/utils/getIcon'


const overviewInfo = [
    { title: "Total Slots", icon: "feather-star", total_number: "", completed_number: "22", progress: "28", chartColor: "#3454d1", color: "primary" },
    { title: "Total Available Slots", icon: "feather-file-text", total_number: "30", completed_number: "5", progress: "34", chartColor: "#25b865", color: "success" },
    { title: "Total Booked SLots", icon: "feather-airplay", total_number: "20", completed_number: "20", progress: "42", chartColor: "#d13b4c", color: "danger" },
    { title: "Total Peak SLots", icon: "feather-airplay", total_number: "20", completed_number: "20", progress: "42", chartColor: "#d13b4c", color: "danger" },
]

const TasksOverviewChart = () => {

    const data = [44, 55, 41, 60, 52, 66, 51]
    const chartOptions = tasksOverviewChartOption()

    return (
        <>
            {
                overviewInfo.map(({ icon, id, progress, title, total_number, chartColor, color }, index) => {
                    return (
                        <div key={index} className="col-lg-3 col-md-6 col-sm-12 task-overview-card">
                            <div className="card mb-4 stretch stretch-full">
                                <div className="card-header d-flex align-items-center justify-content-between">
                                    <div className="d-flex gap-3 align-items-center">
                                        <div className="avatar-text">
                                            <i className='fs-16'>{getIcon(icon)}</i>
                                        </div>
                                        <div>
                                            <div className="fw-semibold text-dark">{title}</div>
                                            <div className="fs-12 text-muted">{total_number} completed</div>
                                        </div>
                                    </div>
                                    <div className="fs-4 fw-bold text-dark">{total_number}</div>
                                </div>
                                <div className="card-body d-flex align-items-center justify-content-between gap-4">
                                    <ReactApexChart
                                        options={{ ...chartOptions, colors: [chartColor] }}
                                        series={[{ name: title, data }]}
                                        type='area'
                                        height={100}
                                        // width={200}
                                    />
                                    <div className="fs-12 text-muted text-nowrap">
                                        <span className={`fw-semibold text-${color}`}>{progress}% more</span><br />
                                        <span>from last week</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
                )
            }
        </>
    )
}

export default TasksOverviewChart

