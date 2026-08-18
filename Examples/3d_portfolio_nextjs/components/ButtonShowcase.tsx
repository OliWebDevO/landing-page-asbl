import Image from "next/image"

type ButtonProps = {
  className?: string;
  id?: string;
  text?: string;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  children?: React.ReactNode;
};

const ButtonShowcase = ({ className, text, onClick, children }: ButtonProps) => {
  return (
    <a
      className={`${className ?? ''} cta-wrapper`}
      onClick={(e) => {
        if (onClick) {
          onClick(e);
          return;
        }
      }}
    >
      <div className='cta-button group'>
        <div className='bg-circle' />
        <p className='text'>{children ?? text}</p>
        <div className='arrow-wrapper'>
          <Image src="/images/arrow-down.svg" width={30} height={30} alt="arrow" />
        </div>
      </div>
    </a>
  );
};

export default ButtonShowcase;