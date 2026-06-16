import { useState } from "react";
import { 
  Users, 
  Boxes, 
  AlertTriangle, 
  TrendingUp, 
  MoreVertical, 
  HelpCircle, 
  Bell,
  Search,
  ArrowRight
} from "lucide-react";

// Shared high-performance SVG arc/pie slide path generator
export function getPieSlicePath(cx, cy, r, startAngle, endAngle) {
  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const radians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(radians),
      y: centerY + radius * Math.sin(radians)
    };
  };

  const startPt = polarToCartesian(cx, cy, r, startAngle);
  const endPt = polarToCartesian(cx, cy, r, endAngle);
  const largeArcFlag = (endAngle - startAngle) > 180 ? 1 : 0;

  return `M ${cx} ${cy} L ${startPt.x} ${startPt.y} A ${r} ${r} 0 ${largeArcFlag} 1 ${endPt.x} ${endPt.y} Z`;
}

export default function Home({
  onNavigateToTab,
  productsCount,
  customers,
  lowStockItemsCount
 }) {
  const [hoveredCategoryIdx, setHoveredCategoryIdx] = useState(null);
  const [hoveredProductIdx, setHoveredProductIdx] = useState(null);
  const [activeRange, setActiveRange] = useState("7D"); // "7D" or "30D"
  const [hoveredPtIdx, setHoveredPtIdx] = useState(null);

  const timeSeriesData7D = [
    { date: "Jun 07", income: 4500, spend: 2100 },
    { date: "Jun 08", income: 5120, spend: 2800 },
    { date: "Jun 09", income: 4800, spend: 3200 },
    { date: "Jun 10", income: 6300, spend: 2400 },
    { date: "Jun 11", income: 5900, spend: 3600 },
    { date: "Jun 12", income: 7200, spend: 2900 },
    { date: "Jun 13", income: 8400, spend: 3100 },
  ];

  const timeSeriesData30D = [
    { date: "May 15", income: 18400, spend: 11200 },
    { date: "May 20", income: 21200, spend: 13400 },
    { date: "May 25", income: 19800, spend: 12100 },
    { date: "May 30", income: 24500, spend: 15300 },
    { date: "Jun 04", income: 22100, spend: 14800 },
    { date: "Jun 09", income: 28900, spend: 16200 },
    { date: "Jun 13", income: 32400, spend: 17100 },
  ];

  const currentSeries = activeRange === "7D" ? timeSeriesData7D : timeSeriesData30D;
  const maxVal = Math.max(...currentSeries.map(d => Math.max(d.income, d.spend))) * 1.15; // 15% top padding

  const svgWidth = 600;
  const svgHeight = 220;
  const padLeft = 45;
  const padRight = 20;
  const padTop = 30;
  const padBottom = 35;

  const chartWidth = svgWidth - padLeft - padRight;
  const chartHeight = svgHeight - padTop - padBottom;

  const points = currentSeries.map((d, index) => {
    const x = padLeft + (index / (currentSeries.length - 1)) * chartWidth;
    const yIncome = svgHeight - padBottom - (d.income / maxVal) * chartHeight;
    const ySpend = svgHeight - padBottom - (d.spend / maxVal) * chartHeight;
    return {
      date: d.date,
      income: d.income,
      spend: d.spend,
      x,
      yIncome,
      ySpend
    };
  });

  const categorySegments = [
    { label: "Electronics", val: 40, color: "#142175", hoverColor: "#2132ab" },
    { label: "Software", val: 25, color: "#2e3a8c", hoverColor: "#475abf" },
    { label: "Hardware", val: 20, color: "#505f76", hoverColor: "#72839c" },
    { label: "Others", val: 15, color: "#e0e3e5", hoverColor: "#c2c7cc" }
  ];

  // Helper vectors for rendering category pie segments
  let cumulativePercent = 0;
  const pieSlices = categorySegments.map((slice, index) => {
    const startPercent = cumulativePercent;
    cumulativePercent += slice.val;
    const endPercent = cumulativePercent;

    const startAngle = (startPercent / 100) * 360;
    const endAngle = (endPercent / 100) * 360;

    const cx = 60;
    const cy = 60;
    const r = 50;

    const d = getPieSlicePath(cx, cy, r, startAngle, endAngle);

    // Mid-angle calculation for hover pull-out transition
    const midAngle = startAngle + (endAngle - startAngle) / 2;
    const midAngleRad = ((midAngle - 90) * Math.PI) / 180.0;
    // Push the hovered slice out slightly
    const offsetDistance = hoveredCategoryIdx === index ? 6 : 0;
    const dx = Math.cos(midAngleRad) * offsetDistance;
    const dy = Math.sin(midAngleRad) * offsetDistance;

    return {
      ...slice,
      d,
      transform: `translate(${dx}px, ${dy}px)`,
      percentage: slice.val
    };
  });

  const productSegments = [
    { label: "PR-1 (Tops)", val: 38, color: "#142175", hoverColor: "#2132ab" },
    { label: "PR-2 (Gadgets)", val: 28, color: "#2e3a8c", hoverColor: "#475abf" },
    { label: "PR-3 (Home)", val: 18, color: "#505f76", hoverColor: "#72839c" },
    { label: "PR-4 (Misc)", val: 16, color: "#b7c8e1", hoverColor: "#cfdaea" }
  ];

  // Helper vectors for rendering product pie segments
  let cumulativeProductPercent = 0;
  const productPieSlices = productSegments.map((slice, index) => {
    const startPercent = cumulativeProductPercent;
    cumulativeProductPercent += slice.val;
    const endPercent = cumulativeProductPercent;

    const startAngle = (startPercent / 100) * 360;
    const endAngle = (endPercent / 100) * 360;

    const cx = 60;
    const cy = 60;
    const r = 50;

    const d = getPieSlicePath(cx, cy, r, startAngle, endAngle);

    // Mid-angle calculation for hover pull-out transition
    const midAngle = startAngle + (endAngle - startAngle) / 2;
    const midAngleRad = ((midAngle - 90) * Math.PI) / 180.0;
    // Push the hovered slice out slightly
    const offsetDistance = hoveredProductIdx === index ? 6 : 0;
    const dx = Math.cos(midAngleRad) * offsetDistance;
    const dy = Math.sin(midAngleRad) * offsetDistance;

    return {
      ...slice,
      d,
      transform: `translate(${dx}px, ${dy}px)`,
      percentage: slice.val
    };
  });

  // Rank customers
  const topCustomers = [...customers]
    .slice(0, 3);

  // Constants mapping values
  const totalCustomersSum = customers.length * 110 + 1015; // default around 1,245

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h2 className="font-sans font-bold text-3xl text-[#191c1e] tracking-tight">Dashboard Overview</h2>
        <p className="font-sans text-sm text-[#454651] mt-1">Welcome back, here's what's happening today.</p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Summary Cards Row (Span 12) */}
        <div className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Total Customers */}
          <div 
            onClick={() => onNavigateToTab("customer")}
            className="glass-card rounded-xl p-6 flex flex-col justify-between h-[150px] hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-[#c6c5d3]/30"
          >
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 rounded-lg bg-[#eceef0] flex items-center justify-center">
                <Users className="w-5 h-5 text-[#505f76]" />
              </div>
              <span className="font-sans text-xs font-semibold text-[#505f76] flex items-center gap-1 bg-[#eceef0] px-2 py-1 rounded-md">
                <TrendingUp className="w-3.5 h-3.5 text-green-600" /> +5.2%
              </span>
            </div>
            <div>
              <p className="font-sans text-xs font-semibold text-[#454651] uppercase tracking-wider">Total Customers</p>
              <h3 className="font-sans font-bold text-3xl text-[#191c1e] mt-1">{totalCustomersSum.toLocaleString()}</h3>
            </div>
          </div>

          {/* Total Products */}
          <div 
            onClick={() => onNavigateToTab("product")}
            className="glass-card rounded-xl p-6 flex flex-col justify-between h-[150px] hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-[#c6c5d3]/30"
          >
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 rounded-lg bg-[#dfe0ff] flex items-center justify-center">
                <Boxes className="w-5 h-5 text-[#142175]" />
              </div>
              <span className="font-sans text-xs font-semibold text-[#505f76] flex items-center gap-1 bg-[#eceef0] px-2 py-1 rounded-md">
                <TrendingUp className="w-3.5 h-3.5 text-green-600" /> +12.4%
              </span>
            </div>
            <div>
              <p className="font-sans text-xs font-semibold text-[#454651] uppercase tracking-wider">Total Products</p>
              <h3 className="font-sans font-bold text-3xl text-[#191c1e] mt-1">{productsCount * 30 + 8410}</h3>
            </div>
          </div>

          {/* Low Stock Highlight */}
          <div 
            onClick={() => onNavigateToTab("inventory")}
            className="bg-[#ffdad6] rounded-xl p-6 flex flex-col justify-between h-[150px] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden cursor-pointer shadow-sm border border-red-200"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 rounded-bl-full pointer-events-none"></div>
            <div className="flex justify-between items-start relative z-10">
              <div className="w-10 h-10 rounded-lg bg-white/60 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-[#ba1a1a]" />
              </div>
              <span className="font-sans text-[11px] font-bold text-[#93000a] bg-white/40 px-2.5 py-1 rounded-md backdrop-blur-sm">Action Required</span>
            </div>
            <div className="relative z-10">
              <p className="font-sans text-xs font-bold text-[#93000a]/80 uppercase tracking-wider">Low Stock Items</p>
              <h3 className="font-sans font-bold text-3xl text-[#ba1a1a] mt-1">
                {lowStockItemsCount} <span className="text-sm font-normal text-[#93000a] opacity-80">SKUs</span>
              </h3>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        {/* Top Products segment */}
        <div className="col-span-12 lg:col-span-4 glass-card rounded-xl p-6 flex flex-col border border-[#c6c5d3]/30">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="font-sans font-bold text-lg text-[#191c1e]">Top Products</h3>
              <p className="font-sans text-xs text-[#454651]">By sales volume</p>
            </div>
            <button className="w-8 h-8 rounded-full hover:bg-[#eceef0] flex items-center justify-center transition-colors">
              <MoreVertical className="w-4 h-4 text-[#767682]" />
            </button>
          </div>
          
          <div className="flex-grow flex flex-col items-center justify-center relative min-h-[190px]">
            <svg className="w-40 h-40 filter drop-shadow-sm" viewBox="0 0 120 120">
              {productPieSlices.map((slice, index) => (
                <path
                  key={slice.label}
                  d={slice.d}
                  fill={hoveredProductIdx === index ? slice.hoverColor : slice.color}
                  style={{
                    transform: slice.transform,
                    transformOrigin: "60px 60px",
                    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                    cursor: "pointer"
                  }}
                  onMouseEnter={() => setHoveredProductIdx(index)}
                  onMouseLeave={() => setHoveredProductIdx(null)}
                />
              ))}
            </svg>

            {/* Dynamic Legend text showing what's hovered */}
            <div className="text-center mt-2.5 h-6">
              {hoveredProductIdx !== null ? (
                <p className="font-sans text-xs font-bold text-[#142175] flex items-center justify-center gap-1.5 animate-fade-in animate-duration-200">
                  <span 
                    className="w-2 h-2 rounded-full inline-block animate-pulse" 
                    style={{ backgroundColor: productSegments[hoveredProductIdx].color }}
                  ></span>
                  <span>{productSegments[hoveredProductIdx].label.split(" (")[0]}:</span> 
                  <span className="text-sm font-extrabold text-[#2e3a8c]">{productSegments[hoveredProductIdx].val}%</span>
                </p>
              ) : (
                <p className="font-sans text-xs text-[#767682] italic">
                  Hover slices to inspect products
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4 px-1 border-t border-[#eceef0] pt-3.5">
            {productSegments.map((segment, idx) => (
              <div 
                key={segment.label}
                className={`flex items-center gap-1.5 p-1 rounded-lg transition-colors cursor-pointer ${
                  hoveredProductIdx === idx ? "bg-[#f2f4f6]" : "hover:bg-[#f8f9fa]"
                }`}
                onMouseEnter={() => setHoveredProductIdx(idx)}
                onMouseLeave={() => setHoveredProductIdx(null)}
              >
                <span 
                  className="w-2 h-2 rounded-full shrink-0" 
                  style={{ backgroundColor: segment.color }}
                ></span>
                <span className={`font-sans text-[11px] truncate ${
                  hoveredProductIdx === idx ? "text-[#142175] font-bold" : "text-[#454651]"
                }`}>
                  {segment.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Financial Overview (Area Chart Mock) */}
        <div className="col-span-12 lg:col-span-8 glass-card rounded-xl p-6 flex flex-col border border-[#c6c5d3]/30 relative">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
            <div>
              <h3 className="font-sans font-bold text-lg text-[#191c1e]">Financial Series</h3>
              <p className="font-sans text-xs text-[#454651]">Continuous Time Series Overview</p>
            </div>
            
            {/* Range Toggle & Custom Legend */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Legends */}
              <div className="flex gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#142175] inline-block"></span>
                  <span className="font-sans text-xs font-semibold text-[#454651]">Income</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ba1a1a] inline-block mb-0.5" style={{ border: "2px dashed #ba1a1a", backgroundColor: "transparent" }}></span>
                  <span className="font-sans text-xs font-semibold text-[#454651]">Spend</span>
                </div>
              </div>

              {/* Timeframe selector controls */}
              <div className="flex items-center p-0.5 bg-[#f2f4f6] rounded-lg border border-[#eceef0]">
                <button
                  onClick={() => setActiveRange("7D")}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                    activeRange === "7D" 
                      ? "bg-white text-[#142175] shadow-sm font-extrabold" 
                      : "text-[#505f76] hover:text-[#191c1e]"
                  }`}
                >
                  7D
                </button>
                <button
                  onClick={() => setActiveRange("30D")}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                    activeRange === "30D" 
                      ? "bg-white text-[#142175] shadow-sm font-extrabold" 
                      : "text-[#505f76] hover:text-[#191c1e]"
                  }`}
                >
                  30D
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 relative w-full h-64 bg-white rounded-xl border border-[#eceef0]/60 p-1 flex items-center justify-center" style={{ minHeight: "220px" }}>
            <svg className="w-full h-full" viewBox={`0 0 ${svgWidth} ${svgHeight}`} preserveAspectRatio="none">
              <defs>
                <linearGradient id="incomeAreaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#142175" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#142175" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="spendAreaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ba1a1a" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#ba1a1a" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
                const yVal = padTop + ratio * chartHeight;
                return (
                  <g key={`grid-${idx}`}>
                    <line
                      x1={padLeft}
                      y1={yVal}
                      x2={svgWidth - padRight}
                      y2={yVal}
                      stroke="#eceef0"
                      strokeWidth="0.75"
                      strokeDasharray="4 4"
                    />
                  </g>
                );
              })}

              {/* Area Fills under curves */}
              {points.length > 0 && (
                <>
                  <path
                    d={`${points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.yIncome}`).join(" ")} L ${points[points.length - 1].x} ${svgHeight - padBottom} L ${points[0].x} ${svgHeight - padBottom} Z`}
                    fill="url(#incomeAreaGrad)"
                  />
                  <path
                    d={`${points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.ySpend}`).join(" ")} L ${points[points.length - 1].x} ${svgHeight - padBottom} L ${points[0].x} ${svgHeight - padBottom} Z`}
                    fill="url(#spendAreaGrad)"
                  />
                </>
              )}

              {/* Path Lines */}
              {points.length > 0 && (
                <>
                  {/* Spend Dash Line */}
                  <path
                    d={points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.ySpend}`).join(" ")}
                    fill="none"
                    stroke="#ba1a1a"
                    strokeWidth="1.75"
                    strokeDasharray="3 3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Income Solid Line */}
                  <path
                    d={points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.yIncome}`).join(" ")}
                    fill="none"
                    stroke="#142175"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </>
              )}

              {/* Hover crosshairs/vertical indicators */}
              {hoveredPtIdx !== null && points[hoveredPtIdx] && (
                <g>
                  {/* Vertical Crosshair Line */}
                  <line
                    x1={points[hoveredPtIdx].x}
                    y1={padTop}
                    x2={points[hoveredPtIdx].x}
                    y2={svgHeight - padBottom}
                    stroke="#142175"
                    strokeOpacity="0.4"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                  />

                  {/* Highlights */}
                  <circle
                    cx={points[hoveredPtIdx].x}
                    cy={points[hoveredPtIdx].yIncome}
                    r="5"
                    fill="#142175"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx={points[hoveredPtIdx].x}
                    cy={points[hoveredPtIdx].ySpend}
                    r="5"
                    fill="#ba1a1a"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                </g>
              )}

              {/* Interactive Hit Zone Bands */}
              {points.map((p, idx) => {
                const step = points.length > 1 ? chartWidth / (points.length - 1) : chartWidth;
                const halfStep = step / 2;
                const hitX = idx === 0 ? p.x : p.x - halfStep;
                const hitWidth = idx === 0 || idx === points.length - 1 ? halfStep : step;
                return (
                  <rect
                    key={`hit-${idx}`}
                    x={hitX}
                    y={padTop}
                    width={hitWidth}
                    height={chartHeight}
                    fill="transparent"
                    style={{ cursor: "crosshair" }}
                    onMouseEnter={() => setHoveredPtIdx(idx)}
                    onMouseMove={() => setHoveredPtIdx(idx)}
                    onMouseLeave={() => setHoveredPtIdx(null)}
                  />
                );
              })}
            </svg>

            {/* HTML Y Axis Labels (Immune to aspect ratio distortion on squeeze) */}
            <div className="absolute top-0 bottom-0 left-0 right-0 pointer-events-none select-none overflow-hidden">
              {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
                const yVal = padTop + ratio * chartHeight;
                const yPercent = (yVal / svgHeight) * 100;
                const amt = Math.round(maxVal - ratio * maxVal);
                return (
                  <div
                    key={`lbl-y-${idx}`}
                    className="absolute font-sans font-medium text-[9px] sm:text-[10px] text-[#767682] pr-1.5 transition-transform duration-200"
                    style={{
                      top: `${yPercent}%`,
                      left: "3px",
                      width: `${padLeft - 6}px`,
                      textAlign: "right",
                      transform: "translateY(-50%)",
                    }}
                  >
                    ${amt >= 1000 ? (amt / 1000).toFixed(1) + "k" : amt}
                  </div>
                );
              })}
            </div>

            {/* HTML X Axis Date Labels (Immune to aspect ratio distortion on squeeze) */}
            <div className="absolute left-0 right-0 bottom-1 flex pointer-events-none select-none h-5 overflow-hidden">
              {points.map((p) => {
                const xPercent = (p.x / svgWidth) * 100;
                return (
                  <div
                    key={`lbl-date-${p.date}`}
                    className="absolute font-sans font-bold text-[9px] sm:text-[10px] text-[#505f76] transition-transform duration-200"
                    style={{
                      left: `${xPercent}%`,
                      transform: "translateX(-50%)",
                    }}
                  >
                    {p.date}
                  </div>
                );
              })}
            </div>

            {/* floating interactive absolute-positioned tooltip */}
            {hoveredPtIdx !== null && points[hoveredPtIdx] && (
              <div 
                className="absolute bg-[#191c1e]/95 text-white p-2 sm:p-2.5 rounded-lg shadow-xl border border-white/10 text-xs pointer-events-none transition-all duration-100 z-10 flex flex-col gap-1 min-w-[110px]"
                style={{
                  left: `${Math.min(
                    Math.max(12, (points[hoveredPtIdx].x / svgWidth) * 100 - 10),
                    88
                  )}%`,
                  top: "14px"
                }}
              >
                <p className="font-sans font-bold border-b border-white/10 pb-0.5 mb-0.5 text-[9px] text-[#b7c8e1] uppercase tracking-wider">
                  {points[hoveredPtIdx].date}
                </p>
                <div className="flex justify-between items-center gap-2">
                  <span className="flex items-center gap-1 text-[10px] text-[#8eb2ff]">
                    <span className="w-1 h-1 rounded-full bg-[#8eb2ff]"></span>
                    Income
                  </span>
                  <span className="font-mono text-[10px] font-bold">${points[hoveredPtIdx].income.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center gap-2">
                  <span className="flex items-center gap-1 text-[10px] text-[#ffb4ab]">
                    <span className="w-1 h-1 rounded-full bg-[#ffb4ab]"></span>
                    Spend
                  </span>
                  <span className="font-mono text-[10px] font-bold">${points[hoveredPtIdx].spend.toLocaleString()}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tables Row */}
        <div className="col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Top Customers Table */}
          <div className="lg:col-span-8 glass-card rounded-xl p-6 border border-[#c6c5d3]/30">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="font-sans font-bold text-lg text-[#191c1e]">Top Customers</h3>
                <p className="font-sans text-xs text-[#454651]">Ranked by total lifetime value</p>
              </div>
              <button 
                onClick={() => onNavigateToTab("customer")}
                className="font-sans text-xs font-bold text-[#142175] hover:text-[#2e3a8c] flex items-center gap-1 transition-colors"
              >
                View All <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#eceef0]">
                    <th className="py-2.5 px-3 font-sans text-xs font-bold text-[#767682] w-16">Rank</th>
                    <th className="py-2.5 px-3 font-sans text-xs font-bold text-[#767682]">Customer Name</th>
                    <th className="py-2.5 px-3 font-sans text-xs font-bold text-[#767682]">Email</th>
                    <th className="py-2.5 px-3 font-sans text-xs font-bold text-[#767682] text-right">Total Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#eceef0]/60">
                  {topCustomers.map((cust, idx) => (
                    <tr key={cust.id} className="hover:bg-[#f2f4f6]/50 transition-colors">
                      <td className="py-3 px-3 font-sans font-bold text-sm text-[#191c1e]">
                        #{idx + 1}
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-sans font-bold text-xs ${
                            idx === 0 ? "bg-[#d0e1fb] text-[#0b1c30]" :
                            idx === 1 ? "bg-amber-100 text-[#723603]" :
                            "bg-[#dfe0ff] text-[#000d60]"
                          }`}>
                            {cust.name.substring(0, 2).toUpperCase()}
                          </div>
                          <span className="font-sans text-sm font-semibold text-[#191c1e]">
                            {cust.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-3 font-sans text-xs text-[#505f76] truncate max-w-[150px]">
                        {cust.email}
                      </td>
                      <td className="py-3 px-3 font-sans font-bold text-sm text-[#142175] text-right">
                        ${(450000 - idx * 69500).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                    </tr>
                  ))}
                  {topCustomers.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-4 text-center font-sans text-sm text-[#505f76]">
                        No customers registered.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Category Dominance Pie Chart */}
          <div className="lg:col-span-4 glass-card rounded-xl p-6 flex flex-col border border-[#c6c5d3]/30">
            <div className="mb-4">
              <h3 className="font-sans font-bold text-lg text-[#191c1e]">Category Dominance</h3>
              <p className="font-sans text-xs text-[#454651]">Distribution of top categories</p>
            </div>
            
            <div className="flex-grow flex flex-col items-center justify-center relative min-h-[190px]">
              <svg className="w-40 h-40 filter drop-shadow-sm" viewBox="0 0 120 120">
                {pieSlices.map((slice, index) => (
                  <path
                    key={slice.label}
                    d={slice.d}
                    fill={hoveredCategoryIdx === index ? slice.hoverColor : slice.color}
                    style={{
                      transform: slice.transform,
                      transformOrigin: "60px 60px",
                      transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                      cursor: "pointer"
                    }}
                    onMouseEnter={() => setHoveredCategoryIdx(index)}
                    onMouseLeave={() => setHoveredCategoryIdx(null)}
                  />
                ))}
              </svg>

              {/* Dynamic Legend text showing what's hovered */}
              <div className="text-center mt-2.5 h-6">
                {hoveredCategoryIdx !== null ? (
                  <p className="font-sans text-xs font-bold text-[#142175] flex items-center justify-center gap-1.5 animate-fade-in">
                    <span 
                      className="w-2 h-2 rounded-full inline-block" 
                      style={{ backgroundColor: categorySegments[hoveredCategoryIdx].color }}
                    ></span>
                    <span>{categorySegments[hoveredCategoryIdx].label}:</span> 
                    <span className="text-sm font-extrabold text-[#2e3a8c]">{categorySegments[hoveredCategoryIdx].val}%</span>
                  </p>
                ) : (
                  <p className="font-sans text-xs text-[#767682] italic">
                    Hover over slices to inspect
                  </p>
                )}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 text-xs border-t border-[#eceef0] pt-3">
              {categorySegments.map((segment, idx) => (
                <div 
                  key={segment.label}
                  className={`flex items-center gap-2 p-1.5 rounded-lg transition-colors cursor-pointer ${
                    hoveredCategoryIdx === idx ? "bg-[#f2f4f6] font-bold" : "hover:bg-[#f8f9fa]"
                  }`}
                  onMouseEnter={() => setHoveredCategoryIdx(idx)}
                  onMouseLeave={() => setHoveredCategoryIdx(null)}
                >
                  <span 
                    className="w-2.5 h-2.5 rounded-full shrink-0" 
                    style={{ backgroundColor: segment.color }}
                  ></span>
                  <span className="font-sans text-[11px] text-[#454651] truncate">
                    {segment.label} ({segment.val}%)
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
