
const DashboardSectionTitle = ({ heading, subHeading }) => {
    return (
        <div className="text-center">
            <h3 className="text-3xl font-semibold">{heading}</h3>
            <p className="font-medium text-sm text-gray-500 mt-2 mb-3">{subHeading}</p>
            <hr className="w-1/2 mx-auto" />
        </div>
    )
}

export default DashboardSectionTitle