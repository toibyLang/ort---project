import { useEffect, useState } from "react";
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { getAllMembersFromServer } from "../members/memberApi";

const Graphes = () => {
    const [mmbrArr, setMmmbrArr] = useState([]);
    const [yAxisData, setYAxisData] = useState(Array(30).fill(0));

    useEffect(() => {
        const getAllMembers = async () => {
            try {
                const res = await getAllMembersFromServer();
                setMmmbrArr(res.data);
            }
            catch (err) {
                console.log(err);
            }
        };

        getAllMembers();
    }, []);

    useEffect(() => {
        const updatedYAxisData = Array(30).fill(0);
        const today = new Date();

        for (let i = 0; i < mmbrArr.length; i++) {
            const member = mmbrArr[i];

            if (member.dateOfPositiveReply != null) {
                let start = 0;
                let end = today.getDate() - 1;

                const positiveDate = new Date(member.dateOfPositiveReply);

                if (
                    positiveDate.getFullYear() === today.getFullYear() &&
                    positiveDate.getMonth() === today.getMonth()
                ) {
                    start = positiveDate.getDate() - 1;
                }

                if (member.recoveryDate != null) {
                    const recoveryDate = new Date(member.recoveryDate);

                    if (
                        recoveryDate.getFullYear() === today.getFullYear() &&
                        recoveryDate.getMonth() === today.getMonth()
                    ) {
                        end = recoveryDate.getDate() - 1;
                    }
                }

                for (let day = start; day < end && day < 30; day++) {
                    updatedYAxisData[day] += 1;
                }
            }
        }

        setYAxisData(updatedYAxisData);
    }, [mmbrArr]);

    const vaccinated = mmbrArr.filter(
        member =>
            Array.isArray(member.vaccinations) &&
            member.vaccinations.length > 0
    ).length;

    const unVaccinated = mmbrArr.length - vaccinated;

    const xAxisData = Array.from(
        { length: 30 },
        (_, index) => index + 1
    );

    return (
        <div>
            <h2 style={{ direction: "rtl", marginRight: "40%" }}>
                נתוני תחלואה והתחסנות לחודש {new Date().getMonth() + 1}
            </h2>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ flex: 1, marginTop: "8%", marginLeft: "10%" }}>
                    <PieChart
                        series={[
                            {
                                data: [
                                    {
                                        id: 0,
                                        value: vaccinated,
                                        label: 'מחוסנים'
                                    },
                                    {
                                        id: 1,
                                        value: unVaccinated,
                                        label: 'לא מחוסנים'
                                    }
                                ],
                            },
                        ]}
                        width={400}
                        height={200}
                    />
                </div>

                <div style={{ flex: 1, marginTop: "4%" }}>
                    <LineChart
                        xAxis={[{ data: xAxisData }]}
                        series={[{ data: yAxisData }]}
                        width={500}
                        height={300}
                    />
                </div>
            </div>
        </div>
    );
};

export default Graphes;