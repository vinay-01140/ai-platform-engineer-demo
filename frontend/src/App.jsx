import { useState } from "react"
import axios from "axios"

function App() {

  const [prompt, setPrompt] = useState("")
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const generatePipeline = async () => {

    try {

      setLoading(true)

      const response = await axios.post(
        "http://localhost:5000/generate",
        {
          prompt: prompt
        }
      )

      setResult(response.data)
    }

    catch (error) {

      setResult({
        error: error.message
      })
    }

    finally {

      setLoading(false)
    }
  }

  return (

    <div
      style={{
        backgroundColor: "#0f172a",
        minHeight: "100vh",
        color: "white",
        padding: "40px",
        fontFamily: "Arial"
      }}
    >

      <div
        style={{
          maxWidth: "1400px",
          margin: "auto"
        }}
      >

        <h1
          style={{
            fontSize: "48px",
            marginBottom: "10px"
          }}
        >
          AI Platform Engineer Demo
        </h1>

        <p
          style={{
            color: "#94a3b8",
            marginBottom: "30px",
            fontSize: "18px"
          }}
        >
          Compiler-style AI generation pipeline
        </p>

        <div
          style={{
            backgroundColor: "#1e293b",
            padding: "25px",
            borderRadius: "15px"
          }}
        >

          <h2>Input Prompt</h2>

          <textarea

            rows="8"

            value={prompt}

            onChange={(e) =>
              setPrompt(e.target.value)
            }

            placeholder="enter here.."

            style={{
              width: "100%",
              marginTop: "15px",
              padding: "15px",
              
              borderRadius: "10px",
              backgroundColor: "#0f172a",
              color: "white",
              border: "1px solid #334155",
              fontSize: "16px"
            }}
          />

          <button

            onClick={generatePipeline}

            style={{
              marginTop: "20px",
              width: "100%",
              padding: "15px",
              borderRadius: "10px",
              border: "none",
              backgroundColor: "#2563eb",
              color: "white",
              fontSize: "18px",
              cursor: "pointer"
            }}
          >

            {
              loading
                ? "Generating..."
                : "Generate Pipeline"
            }

          </button>

          <div
            style={{
              display: "flex",
              gap: "15px",
              marginTop: "25px"
            }}
          >

            <div
              style={{
                flex: 1,
                backgroundColor: "#0f172a",
                padding: "20px",
                borderRadius: "10px"
              }}
            >

              <p style={{ color: "#94a3b8" }}>
                Pipeline Stages
              </p>

              <h2>5</h2>

            </div>

            <div
              style={{
                flex: 1,
                backgroundColor: "#0f172a",
                padding: "20px",
                borderRadius: "10px"
              }}
            >

              <p style={{ color: "#94a3b8" }}>
                Reliability
              </p>

              <h2 style={{ color: "#22c55e" }}>
                High
              </h2>

            </div>

          </div>

        </div>

        <div
          style={{
            backgroundColor: "#1e293b",
            marginTop: "30px",
            padding: "25px",
            borderRadius: "15px"
          }}
        >

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >

            <h2>Generated Output</h2>

            {
              result?.success && (

                <div
                  style={{
                    backgroundColor: "#14532d",
                    color: "#4ade80",
                    padding: "8px 15px",
                    borderRadius: "20px",
                    fontSize: "14px"
                  }}
                >

                  Executable

                </div>
              )
            }

          </div>

          <div
            style={{
              marginTop: "20px",
              backgroundColor: "#0f172a",
              padding: "20px",
              borderRadius: "10px",
              height: "700px",
              overflow: "auto"
            }}
          >

            <pre
              style={{
                color: "#cbd5e1",
                whiteSpace: "pre-wrap",
                fontSize: "15px",
                lineHeight: "1.8",
                fontFamily: "Consolas"
              }}
            >

              {
                result
                  ? JSON.stringify(result, null, 4)
                  : "Generated output appears here..."
              }

            </pre>

          </div>

        </div>

      </div>

    </div>
  )
}

export default App