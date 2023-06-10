import React, { useState, useEffect } from "react";
import globalAlignment from "../../components/Global";

export default function testGlobalAlignment() {
  const [referenceText, setReferenceText] = useState("");
  const [targetText, setTargetText] = useState([]);
  const [expectedNumberOfMiscues, setExpectedNumberOfMiscues] = useState(0);

  const [isAlignmentSuccess, setIsAlignmentSuccess] = useState(false);

  // Miscue counts
  const [insertionsNum, setInsertionsNum] = useState(0);
  const [substitutionsNum, setSubstitutionsNum] = useState(0);
  const [deletionsNum, setDeletionsNum] = useState(0);

  const manualAlignment = () => {
    let miscues = globalAlignment(referenceText, targetText);

    let sumMiscues =
      miscues.numInsertions + miscues.numSubstitutions + miscues.numDeletions;

    if (sumMiscues === expectedNumberOfMiscues) {
      setIsAlignmentSuccess(true);
    } else {
      setIsAlignmentSuccess(false);
    }
  };

  const testAlignment = () => {
    const refTexts = ["The quick brown fox jumps over the lazy dog"];
    const targetTexts = [
      "The quick quick brown fox over the lacy lazy jumpy dog",
    ];
    const expectedMiscues = [3];
    for (let i = 0; i < refTexts.length; i++) {
      let miscues = globalAlignment(refTexts[i], targetTexts[i]);

      setReferenceText(refTexts[i]);
      setTargetText(targetTexts[i]);
      setExpectedNumberOfMiscues(expectedMiscues[i]);

      setInsertionsNum(miscues.numInsertions);
      setSubstitutionsNum(miscues.numSubstitutions);
      setDeletionsNum(miscues.numDeletions);

      let sumMiscues =
        miscues.numInsertions + miscues.numSubstitutions + miscues.numDeletions;

      if (sumMiscues === expectedMiscues[i]) {
        setIsAlignmentSuccess(true);
      } else {
        setIsAlignmentSuccess(false);
      }
    }
  };

  useEffect(() => {
    testAlignment();
  }, []);

  return (
    <div className="flex flex-col gap-4 p-16">
      <p className="font-bold text-2xl">Text Alignment</p>
      <div className="grid grid-cols-5">
        <div className="col-span-3 p-4">
          <div className="flex flex-col">
            <label className="font-bold">Reference Text</label>
            <textarea
              className="border-2 border-gray-900 rounded-sm p-2"
              rows={5}
              cols={5}
              value={referenceText}
              onChange={(e) => {
                setReferenceText(e.target.value);
              }}
            ></textarea>
          </div>

          <div className="flex flex-col mt-8">
            <label className="font-bold">Target Text</label>
            <textarea
              className="border-2 border-gray-900 rounded-sm p-2"
              rows={5}
              cols={5}
              value={targetText}
              onChange={(e) => {
                setTargetText(e.target.value);
              }}
            ></textarea>
          </div>

          <div className="flex flex-row mt-8 gap-4 place-items-center">
            <label className="font-bold">Expected Number of Miscues</label>
            <input
              className="border-2 border-gray-900 p-2"
              type="number"
              value={expectedNumberOfMiscues}
              placeholder={0}
              onChange={(e) => {
                setExpectedNumberOfMiscues(e.target.value);
              }}
            />
            {/* <button
              className="align-end rounded bg-coraBlue-1 text-center p-2 px-8 text-white font-bold justify-self-end w-1/2"
              onClick={manualAlignment}
            >
              Align Texts
            </button> */}
          </div>
        </div>

        <div className="col-span-2 border-l-2 p-4">
          {!isAlignmentSuccess && (
            <div className="bg-red-700 text-center uppercase text-white p-4 font-bold">
              Failed
            </div>
          )}
          {isAlignmentSuccess && (
            <div className="bg-green-600 text-center uppercase text-white p-4 font-bold">
              Success
            </div>
          )}

          <table className="table-auto md:table-fixed w-full text-md text-left mt-8">
            <thead>
              <tr className="border-b-4 border-black text-lg">
                <th>Substitutions</th>
                <th>Insertions</th>
                <th>Deletions</th>
              </tr>
            </thead>
            <tbody>
              <td className="p-2">{substitutionsNum}</td>
              <td className="p-2">{insertionsNum}</td>
              <td className="p-2">{deletionsNum}</td>
            </tbody>
          </table>

          <div className="flex flex-row mt-8 gap-4">
            <p className="font-bold">Total</p>
            <p>{insertionsNum + substitutionsNum + deletionsNum}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
