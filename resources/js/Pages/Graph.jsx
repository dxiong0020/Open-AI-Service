import {Head} from "@inertiajs/react";
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
                return <BarGraph data={graphData} />;
            case "monthly_cost":
                return <LineGraph data={graphData} />;
        }
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Analytics
                </h2>
            }
        >
            <Head title="Analytics" />
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 py-6">
            <div className="bg-gray-100 dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-2xl border border-gray-200/50 dark:border-gray-700">
                <div className="p-6 md:p-8">
                    {/* Controls */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <div>
                            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">Analytics Overview</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 text-nowrap">View your usage and cost statistics</p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <select
                                id="graphType"
                                className="bg-white text-gray-700 border border-gray-200 rounded-xl px-4 py-2 text-sm font-medium
                                focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700"
                                onChange={(e) => setGraph(e.target.value)}
                                value={currentGraph}
                            >
                                <option value="open_ai_usage">Chat Bot enquiries</option>
                                <option value="monthly_cost">Cost Usage</option>
                            </select>

                            <select
                                id="graphYear"
                                className="bg-white text-gray-700 border border-gray-200 rounded-xl px-4 py-2 text-sm font-medium
                                focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700"
                                onChange={(e) => setYear(e.target.value)}
                                value={year}
                            >
                                {years.map((y) => (
                                    <option key={y} value={y}>{y}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-900/40 rounded-2xl p-4 md:p-6 border border-gray-100 dark:border-gray-800/50 shadow-inner min-h-[400px] flex items-center justify-center">
                        <div className="w-full h-full max-h-[600px]">
                            {displayGraph()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
);
}
