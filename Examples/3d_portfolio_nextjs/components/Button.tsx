import Image from "next/image"

const Button = ({className, text, href} : ButtonProps) => {
  return (
    <a className={`${className ?? ''} cta-wrapper`}
     href={href}>

        <div className='cta-button group'>
            <div className='bg-circle'/>
                <p className='text'>{text}</p>
                <div className='arrow-wrapper'>
                    <Image src="/images/arrow-down.svg" width={30} height={30} alt="arrow" />
                </div>
        </div>
    </a>
  )
}

export default Button