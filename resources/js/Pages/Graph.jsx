import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import BarGraph from "@/Components/BarGraph";
import { fetchData } from "@/Helpers/fetch";
import LineGraph from "@/Components/LineGraph";

Chart.register(CategoryScale);

export default function Graph({ years }) {
    const [currentGraph, setGraph] = useState("open_ai_usage");
    const [graphData, setGraphData] = useState([]);
    const [year, setYear] = useState(years[0] ?? 2025);
    useEffect(() => {
        async function loadGraphData() {
            if (currentGraph === "open_ai_usage") {
                const data = await fetchData("/api/openAiUsage", "POST", {
                    year: year,
                });
                let graphData = data?.graphData;
                if (!graphData) {
                    graphData = [];
                }
                setGraphData(graphData);
            } else if (currentGraph === "monthly_cost") {
                const data = await fetchData("/api/monthlyCostUsage", "POST", {
                    year: year,
                });
                let graphData = data?.graphData;
                if (!graphData) {
                    graphData = [];
                }
                setGraphData(graphData);
            }
        }

        loadGraphData();
    }, [currentGraph, year]);

    function displayGraph() {
        switch (currentGraph) {
            case "open_ai_usage":
                return <BarGraph data={graphData} title={"Open AI Usage"} />;
            case "monthly_cost":
                return <LineGraph data={graphData} title={"Costs"} />;
        }
    }

    function displayYears() {
        return years.map((year) => (
            <option key={year} value={year}>
                {year}
            </option>
        ));
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Graphs
                </h2>
            }
        >
            <Head title="Chat" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="mb-4">
                                <select
                                    id="graphType"
                                    className="w-full md:w-1/6 bg-white text-gray-900 border border-gray-300 rounded-lg px-3 py-2
                                focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600"
                                    onChange={(e) => setGraph(e.target.value)}
                                >
                                    <option value="open_ai_usage">
                                        Chat Bot enquiries
                                    </option>
                                    <option value="monthly_cost">
                                        Cost Usage
                                    </option>
                                </select>
                                <select
                                    id="graphYear"
                                    className="w-full md:w-1/6 bg-white text-gray-900 border border-gray-300 rounded-lg px-3 py-2
                                focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600"
                                    onChange={(e) => setYear(e.target.value)}
                                >
                                    {years.map((year) => (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex h-screen resize overflow-auto max-h-[700px] overflow-y-auto">
                                {displayGraph()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
