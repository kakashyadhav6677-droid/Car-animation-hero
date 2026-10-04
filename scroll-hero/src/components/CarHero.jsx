import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./CarHero.css";

gsap.registerPlugin(ScrollTrigger);

function CarHero() {
  const sectionRef = useRef(null);
  const carRef = useRef(null);
  const trailRef = useRef(null);
  const valueAddRef = useRef(null);

  const lettersRef = useRef([]);

  const box1Ref = useRef(null);
  const box2Ref = useRef(null);
  const box3Ref = useRef(null);
  const box4Ref = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const car = carRef.current;
    const trail = trailRef.current;
    const valueAdd = valueAddRef.current;

    const letters = lettersRef.current;

    const ctx = gsap.context(() => {
      gsap.set(letters, { opacity: 0 });
      gsap.set(
        [box1Ref.current, box2Ref.current, box3Ref.current, box4Ref.current],
        { opacity: 0 }
      );
      gsap.set(car, { x: 0 });
      gsap.set(trail, { width: 0 });

      const valueRect = valueAdd.getBoundingClientRect();
      const letterOffsets = letters.map((letter) => letter.offsetLeft);

      const carAnimation = gsap.to(car, {
        x: () => {
          const roadWidth = section.querySelector(".road").offsetWidth;
          const carWidth = car.offsetWidth;
          return roadWidth - carWidth;
        },
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
          pin: ".track",
          onUpdate: function () {
            const carX = gsap.getProperty(car, "x") + car.offsetWidth / 2;
            letters.forEach((letter, i) => {
              const letterX = valueRect.left + letterOffsets[i];
              if (carX >= letterX) {
                gsap.to(letter, {
                  opacity: 1,
                  duration: 0.1,
                  overwrite: true,
                });
              } else {
                gsap.to(letter, {
                  opacity: 0,
                  duration: 0.1,
                  overwrite: true,
                });
              }
            });
            gsap.set(trail, { width: carX });
          },
        },
      });

      gsap.to(box1Ref.current, {
        opacity: 1,
        scrollTrigger: {
          trigger: section,
          start: "top+=400 top",
          end: "top+=600 top",
          scrub: true,
        },
      });

      gsap.to(box2Ref.current, {
        opacity: 1,
        scrollTrigger: {
          trigger: section,
          start: "top+=600 top",
          end: "top+=800 top",
          scrub: true,
        },
      });

      gsap.to(box3Ref.current, {
        opacity: 1,
        scrollTrigger: {
          trigger: section,
          start: "top+=800 top",
          end: "top+=1000 top",
          scrub: true,
        },
      });

      gsap.to(box4Ref.current, {
        opacity: 1,
        scrollTrigger: {
          trigger: section,
          start: "top+=1000 top",
          end: "top+=1200 top",
          scrub: true,
        },
      });

      return () => {
        carAnimation.kill();
      };
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const addLetterRef = (element) => {
    if (element && !lettersRef.current.includes(element)) {
      lettersRef.current.push(element);
    }
  };

  return (
    <section ref={sectionRef} className="section">
      <div className="track">
        <div className="road" id="road">
          <img
            ref={carRef}
            src="/car.png"
            alt="Car"
            className="car"
            id="car"
          />
          <div ref={trailRef} className="trail" id="trail" />

          <div
            className="value-add"
            ref={valueAddRef}
            id="valueText"
            style={{ top: "30%" }}
          >
            {"WELCOME ITZ FIZZ".split("").map((letter, index) => (
              <span
                key={index}
                ref={addLetterRef}
                className="value-letter"
              >
                {letter === " " ? "\u00A0" : letter}
              </span>
            ))}
          </div>
        </div>

        <div className="text-box" id="box1" ref={box1Ref} style={{ top: "5%", right: "30%" }}>
          <span className="num-box">58%</span> Increase in pick up point use
        </div>
        <div
          className="text-box"
          id="box2"
          ref={box2Ref}
          style={{ bottom: "5%", right: "35%" }}
        >
          <span className="num-box">23%</span> Decreased in customer phone calls
        </div>
        <div
          className="text-box"
          id="box3"
          ref={box3Ref}
          style={{ top: "5%", right: "10%" }}
        >
          <span className="num-box">27%</span> Increase in pick up point use
        </div>
        <div
          className="text-box"
          id="box4"
          ref={box4Ref}
          style={{ bottom: "5%", right: "12.5%" }}
        >
          <span className="num-box">40%</span> Decreased in customer phone calls
        </div>
      </div>
    </section>
  );
}

export default CarHero;
