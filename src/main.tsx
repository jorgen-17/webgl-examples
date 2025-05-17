import * as React from "react";
import * as ReactDOM from "react-dom";
import CameraControlsPage from "./pages/CameraControlsPage";

// Simple router state
interface AppState {
    currentPage: string;
}

class App extends React.Component<{}, AppState>
{
    constructor(props: {})
    {
        super(props);

        // Initialize state with the current page based on URL
        this.state = {
            currentPage: this.getPageFromUrl()
        };

        // Listen for popstate events (back/forward browser buttons)
        window.addEventListener('popstate', this.handlePopState);
    }

    getPageFromUrl(): string {
        const path = window.location.pathname;
        if (path === "/camera-controls") return "camera-controls";
        return "home";
    }

    // Handle browser back/forward buttons
    handlePopState = () => {
        this.setState({
            currentPage: this.getPageFromUrl()
        });
    }

    // Navigate to a different page
    navigateTo = (page: string) => {
        // Update browser history
        const url = page === "home" ? "/" : `/${page}`;
        window.history.pushState(null, '', url);

        // Update component state
        this.setState({ currentPage: page });
    }

    render() {
        // Render different content based on the current page
        if (this.state.currentPage === "camera-controls") {
            return <CameraControlsPage />;
        }

        // Home page with links to examples
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                padding: '20px',
                backgroundColor: '#1e1e1e',
                color: 'white'
            }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '40px' }}>WebGL Examples</h1>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px',
                    width: '300px'
                }}>
                    <ExampleCard
                        title="Camera Controls"
                        description="Example demonstrating WASD camera controls with a simple white box."
                        onClick={() => this.navigateTo("camera-controls")}
                    />

                    {/* Add more example cards here as you create them */}
                </div>
            </div>
        );
    }

    componentWillUnmount() {
        // Remove popstate event listener
        window.removeEventListener('popstate', this.handlePopState);
    }
}

// A simple card component for example links
interface ExampleCardProps {
    title: string;
    description: string;
    onClick: () => void;
}

function ExampleCard(props: ExampleCardProps) {
    const { title, description, onClick } = props;

    return (
        <div
            onClick={onClick}
            className="example-card"
            style={{
                backgroundColor: '#333',
                borderRadius: '8px',
                padding: '20px',
                cursor: 'pointer',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                border: '1px solid #444'
            }}
        >
            <h2 style={{ margin: '0 0 10px 0', color: '#4CAF50' }}>{title}</h2>
            <p style={{ margin: 0, color: '#ccc' }}>{description}</p>
        </div>
    );
}

document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(<App/>, document.getElementById("main"));
}, false);
