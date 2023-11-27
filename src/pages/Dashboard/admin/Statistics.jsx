import useGetSecure from "../../../hooks/tanstack/useGetSecure"
import useGetPublic from "../../../hooks/tanstack/useGetPublic";
import Chart from 'react-apexcharts';


const Statistics = () => {

    const { data } = useGetSecure(["bookingStats"], `/admin/bookings`);

    const { data: bookingComp } = useGetPublic(["bookingComp"], "/admin/bookingCount");
    console.log(bookingComp)


    //For bar chart
    const chartOptions = {
        chart: {
            id: 'bar-chart',
            type: 'bar',
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '40px',
            },
        },
        xaxis: {
            categories: data?.map(({ date }) => date),
            labels: {
                show: true,
                rotateAlways: true,
                rotate: -45,
                formatter: function (value) {
                    return new Date(value).toLocaleDateString();
                },
            },
        },
        yaxis: {
            title: {
                text: 'Booking Count',
            },
        },
    };


    const chartSeries = [
        {
            name: 'Booking Count',
            data: data?.map(({ date, bookingCount }) => [new Date(date).getTime(), bookingCount]),
        },
    ];



    //For line chart
    const totalParcel = bookingComp?.total;
    const deliveredParcel = bookingComp?.delivered;



    const options = {
        chart: {
            id: 'line-chart',
            type: 'line',
            height: 350,
        },
        xaxis: {
            categories: ['Parcels'],
        },
        yaxis: {
            title: {
                text: 'Number of Parcels',
            },
        },
    };

    const series = [
        {
            name: 'Total Parcels',
            data: [totalParcel],
        },
        {
            name: 'Delivered Parcels',
            data: [deliveredParcel],
        },
    ];




    return <div>
        <h3 className="text-3xl font-semibold mb-20">Welcome Admin,</h3>

        <div className="grid lg:grid-cols-2 gap-6">
            <Chart options={chartOptions} series={chartSeries} type="bar" height="350" />
            <Chart options={options} series={series} type="line" height={350} />
        </div>
    </div>
}

export default Statistics