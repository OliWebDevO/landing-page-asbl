const TitleHeader = ({title, cn} : TitleHeaderProps) => {
  return (
    <div className={`flex flex-col items-center gap-5 ${cn}`}>
      <div className="font-semibold text-3xl md:text-5xl text-center">
        {title}
      </div>
    </div>
  )
}

export default TitleHeader