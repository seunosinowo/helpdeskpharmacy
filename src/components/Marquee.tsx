const Marquee = () => {
  const items = ["Healthcare", "Wellness", "Pharmacy", "Medications", "Expert Advice", "24/7 Service", "Quality Care"];
  const repeated = [...items, ...items];

  return (
    <div className="overflow-hidden py-4 gradient-bg">
      <div className="marquee flex whitespace-nowrap">
        {repeated.map((item, i) => (
          <span key={i} className="text-primary-foreground/80 text-sm font-medium mx-6 flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground/40" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
