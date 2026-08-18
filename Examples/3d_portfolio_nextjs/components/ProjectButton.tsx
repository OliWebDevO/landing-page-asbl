import Image from "next/image"
import Link from "next/link";

const ProjectButton = ({className, text, href} : ButtonProjectProps) => {
  return (
    <Link className={`${className ?? ''} cta-wrapper`} href={href}>
        <div className='cta-button group'>
            <div className='bg-circle'/>
                <p className='text'>{text}</p>
                <div className='arrow-wrapper'>
                    <Image src="/images/arrow-right.svg" width={30} height={30} alt="arrow" />
                </div>
        </div>
    </Link>
  )
}

export default ProjectButton