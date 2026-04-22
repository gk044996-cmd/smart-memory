import { useState } from "react";
import { getPhraseCategories } from "../data/phrasesData";

const Phrases = () => {
    const categories = getPhraseCategories();
    const allItems = categories.flatMap(cat => cat.items);

    const [activePhrase, setActivePhrase] = useState(allItems[0]);
    const [practiceAnswer, setPracticeAnswer] = useState("");

    const currentIndex = allItems.findIndex(i => i.id === activePhrase.id);

    const handleSelect = (phrase) => {
        setActivePhrase(phrase);
        setPracticeAnswer("");
    };

    const handleNext = () => {
        if (currentIndex < allItems.length - 1) {
            handleSelect(allItems[currentIndex + 1]);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            handleSelect(allItems[currentIndex - 1]);
        }
    };

    return (
        <div className="app-container">

            <h2>{activePhrase?.title}</h2>
            <p>{activePhrase?.meaning}</p>

            {/* Practice input */}
            <input
                type="text"
                placeholder="Type your answer..."
                value={practiceAnswer}
                onChange={(e) => setPracticeAnswer(e.target.value)}
            />

            {/* Navigation buttons */}
            <div style={{ marginTop: "10px" }}>
                <button onClick={handlePrev}>Prev</button>
                <button onClick={handleNext}>Next</button>
            </div>

        </div>
    );
};

export default Phrases;