const About = () => {

  return (

    <div className="space-y-16">

      {/* HERO */}

      <section className="relative rounded-[2.5rem] overflow-hidden min-h-[55vh] flex items-center">

        <img

          src="/construction1.jpeg"

          alt="About Foundation"

          className="absolute inset-0 w-full h-full object-cover"

        />

        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative z-10 px-8 md:px-16 py-20 max-w-4xl">

          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight">

            About
            Foundation

          </h1>

          <p className="mt-6 text-xl text-stone-200 leading-8">

            कांवरिया सेवा ही
            सच्ची शिव सेवा है।

          </p>

        </div>

      </section>

      {/* ABOUT */}

      <section className="bg-white rounded-[2.5rem] p-10 border border-stone-200 shadow-sm">

        <div className="max-w-5xl mx-auto">

          <h2 className="text-4xl font-extrabold text-stone-900">

            हमारे बारे में

          </h2>

          <p className="mt-8 text-lg leading-9 text-stone-600">

            शिव शक्ति सेवा फाउंडेशन
            एक गैर-लाभकारी संस्था है।

            हमारा उद्देश्य बाबा बैद्यनाथ
            धाम जाने वाले लाखों कांवर
            यात्रियों की सेवा करना है।

          </p>

          <p className="mt-6 text-lg leading-9 text-stone-600">

            सुल्तानगंज से गंगाजल लेकर
            देवघर जाने वाले श्रद्धालुओं
            के लिए निःशुल्क विश्राम,
            भोजन, पेयजल एवं चिकित्सा
            सुविधा हेतु विशाल सेवा भवन
            का निर्माण किया जा रहा है।

          </p>

          <p className="mt-6 text-lg leading-9 text-stone-600">

            इस सेवा भवन में सभी सेवाएँ
            पूर्णतः निःशुल्क उपलब्ध
            कराई जाएँगी।

          </p>

        </div>

      </section>

      {/* CONSTRUCTION */}

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">

        <img

          src="/construction1.jpeg"

          alt="Construction"

          className="w-full h-[450px] object-cover rounded-[2rem]"

        />

        <img

          src="/construction2.jpeg"

          alt="Construction"

          className="w-full h-[450px] object-cover rounded-[2rem]"

        />

      </section>

      {/* MISSION */}

      <section className="bg-white rounded-[2.5rem] p-10 border border-stone-200 shadow-sm">

        <h2 className="text-4xl font-extrabold text-stone-900 mb-10">

          हमारा संकल्प

        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {[

            'निःशुल्क विश्राम एवं रैन बसेरा',

            'पेयजल एवं भोजन सेवा',

            'प्राथमिक चिकित्सा सुविधा',

            'महादेव भक्तों की सेवा',

            'पारदर्शी एवं विश्वसनीय व्यवस्था',

            'सेवा, समर्पण और धर्म का मार्ग'

          ].map((item, index) => (

            <div

              key={index}

              className="bg-stone-50 border border-stone-200 rounded-2xl p-6"

            >

              <p className="text-lg font-semibold text-stone-700">

                ✅ {item}

              </p>

            </div>

          ))}

        </div>

      </section>

    </div>

  );

};

export default About;