import { useState } from "react";
// ❌ removed: import { useNavigate } from "react-router-dom";
import { getPhraseCategories } from "../data/phrasesData";

const Phrases = () => {
    // ❌ removed: const navigate = useNavigate();

    const categories = getPhraseCategories();

    const allItems = categories.flatMap(cat => cat.items);

    const [activePhrase, setActivePhrase] = useState(allItems[0]);
    const [practiceAnswer, setPracticeAnswer] = useState(null);

    const currentIndex = allItems.findIndex(i => i.id === activePhrase.id);

    const handleSelect = (phrase) => {
        setActivePhrase(phrase);
        setPracticeAnswer(null);
    };

    const handleNext = () => {
        if (currentIndex < allItems.length - 1) handleSelect(allItems[currentIndex + 1]);
    };

    const handlePrev = () => {
        if (currentIndex > 0) handleSelect(allItems[currentIndex - 1]);
    };

    return (
        <div className="app-container">
            {/* your full UI unchanged */}
        </div>
    );
};

export default Phrases;