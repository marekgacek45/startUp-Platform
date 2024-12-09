
const Ping = () => {
  return (
    <div className="relative">
        <div className="absolute -left-4 top-1">
            <span className="flex size-[11px]">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacoty-75"></span>
                <span className="relattive inline-flex size-[11px] rounded-full"></span>
            </span>
        </div>
    </div>
  )
}

export default Ping