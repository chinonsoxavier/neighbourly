import gsap from "gsap";
import { SplitText } from "gsap/all";
import React, { JSX, useEffect, useRef } from "react";

const TextStagger = ({
  children,
  className,
}: Readonly<{ className?: string; children: React.ReactNode }>) => {
  const textRef = useRef(null);

  useEffect(() => {
    if (!textRef.current) return;
    const splitText = SplitText.create(textRef.current, {
      type: "chars",
      //   charsClass: "text-stagger-char",
    });

    gsap.from(splitText.chars, {
      duration: 0.05,
      y: 100,
      opacity: 0,
      stagger: 0.1,
    });

    return () => {
      splitText.revert();
    };
  }, []);

  return (
    <span className={className} ref={textRef}>
      {children}
    </span>
  );
};

export default TextStagger;

//  <TextStagger className="bg-linear-to-r from-violet via-primary to-ember bg-clip-text text-transparent block">
//                 warmer way
//               </TextStagger>; import gsap from "gsap";
// import { SplitText } from "gsap/all";
// import React, { JSX, useEffect, useRef } from "react";

// const TextStagger = ({
//   children,
//   className,
// }: Readonly<{ className?: string; children: React.ReactNode }>) => {
//   const textRef = useRef(null);

//   useEffect(() => {
//     if (!textRef) return;
//     const splitText = SplitText.create(textRef.current, { type: "chars" });

//     gsap.from(splitText.chars, {
//       duration: 0.1,
//       y: 50,
//       opacity: 0,
//       stagger: 0.1,
//     });
//   }, []);

//   return (
//     <span className={className} ref={textRef}>
//       {children}
//     </span>
//   );
// };

// export default TextStagger;
//  text clip not working. the text is invisible
