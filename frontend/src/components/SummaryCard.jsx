function SummaryCard({ title, amount, icon: Icon, color }) {

  return (

    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition flex items-center justify-between">

      {/* Left */}

      <div>

        <h3 className="text-sm text-slate-500 font-medium">
          {title}
        </h3>

        <p className="text-2xl font-bold text-slate-800 mt-1">
          ₹ {amount?.toLocaleString() || 0}
        </p>

      </div>

      {/* Icon */}

      {Icon && (

        <div className={`p-3 rounded-lg ${color || "bg-blue-100"}`}>

          <Icon size={22} className="text-blue-600" />

        </div>

      )}

    </div>

  );

}

export default SummaryCard;