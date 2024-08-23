import React from "react";

const HomePage: React.FC = () => {
  return (
    <div>
      <div className="contentCard">
        <h1 className="text-4xl font-bold text-center mb-6">
          NASA - National Aeronautics and Space Administration
        </h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>
          <p>
            The National Aeronautics and Space Administration (NASA) is an
            independent agency of the U.S. federal government responsible for
            the civilian space program, as well as aeronautics and aerospace
            research. NASA was created in response to the Soviet Union's October
            4, 1957 launch of its first satellite, Sputnik I.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Creation</h2>
          <p>
            NASA was established on July 29, 1958, by the National Aeronautics
            and Space Act, with the objective of conducting peaceful space
            exploration activities. Since its inception, NASA has been at the
            forefront of space exploration, pioneering new technologies and
            conducting scientific research that has expanded our understanding
            of the universe.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Mission</h2>
          <p>
            NASA's mission is to drive advances in science, technology,
            aeronautics, and space exploration to enhance knowledge, education,
            innovation, economic vitality, and stewardship of Earth. Its vision
            is to reach for new heights and reveal the unknown for the benefit
            of humankind.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Notable Achievements</h2>
          <ul className="list-disc ml-6">
            <li>
              Landing the first humans on the Moon during the Apollo 11 mission
              in 1969.
            </li>
            <li>
              Launching the Hubble Space Telescope in 1990, which has provided
              stunning images and vital data about the universe.
            </li>
            <li>
              Sending robotic explorers like the Mars Rovers to study the
              surface of Mars.
            </li>
            <li>
              Developing the International Space Station (ISS) in collaboration
              with other space agencies.
            </li>
            <li>
              Advancing aeronautics research and developing innovative
              technologies for aviation safety and efficiency.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Future Exploration</h2>
          <p>
            NASA continues to push the boundaries of space exploration with
            ambitious missions to return humans to the Moon through the Artemis
            program, and plans to send astronauts to Mars in the near future.
            NASA's focus on Earth science is also crucial in monitoring our
            planet's climate and developing technologies to protect the
            environment.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Learn More</h2>
          <p>
            For more information, visit the official NASA website at{" "}
            <a href="https://www.nasa.gov" className="text-blue-500 underline">
              www.nasa.gov
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
