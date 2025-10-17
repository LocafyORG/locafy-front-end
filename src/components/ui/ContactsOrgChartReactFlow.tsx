import React, { useCallback, useMemo, useState, useRef } from 'react';
import ReactFlow, {
  Node,
  Edge,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  BackgroundVariant,
  NodeTypes,
  EdgeTypes,
  ConnectionMode,
  ReactFlowProvider,
  useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Contact } from '@api/interfaces/ContactsDTO';

interface ContactsOrgChartProps {
  contacts: Contact[];
  onContactSelect?: (contact: Contact) => void;
  className?: string;
  allowLinking?: boolean;
  onLinksChange?: (links: { from: string; to: string; label?: string }[]) => void;
  persistData?: boolean;
  storageKey?: string;
}

// Custom Node Component
const ContactNode: React.FC<{
  data: {
    contact: Contact;
    name: string;
    title: string;
    department: string;
    initials: string;
    color: string;
    email: string;
    phone: string;
  };
}> = ({ data }) => {
  const handleEmailClick = useCallback(() => {
    if (data.email) {
      window.open(`mailto:${data.email}`);
    }
  }, [data.email]);

  const handlePhoneClick = useCallback(() => {
    if (data.phone) {
      window.open(`tel:${data.phone}`);
    }
  }, [data.phone]);

  return (
    <div className="bg-gray-800 border border-gray-600 rounded-lg shadow-lg min-w-[280px] min-h-[120px] relative overflow-hidden">
      {/* Vertical colored bar */}
      <div 
        className="absolute left-0 top-0 w-1.5 h-full"
        style={{ backgroundColor: data.color }}
      />
      
      {/* Main content */}
      <div className="p-4 h-full flex flex-col">
        {/* Name and Department Tag */}
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-white font-bold text-base leading-tight pr-3">
            {data.name}
          </h3>
          <span className="bg-green-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
            {data.department}
          </span>
        </div>
        
        {/* Title and Profile Picture */}
        <div className="flex items-start justify-between mb-3">
          <p className="text-gray-300 text-sm leading-tight pr-3 flex-1">
            {data.title}
          </p>
          <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center border border-gray-500 flex-shrink-0">
            <span className="text-gray-300 font-bold text-sm">
              {data.initials}
            </span>
          </div>
        </div>
        
        {/* Contact Buttons */}
        <div className="flex gap-2 mt-auto">
          <button
            onClick={handleEmailClick}
            className="bg-gray-700 hover:bg-gray-600 text-white text-xs px-3 py-1.5 rounded flex items-center gap-1.5 transition-colors"
            disabled={!data.email}
          >
            <span>✉</span>
            <span>Email</span>
          </button>
          <button
            onClick={handlePhoneClick}
            className="bg-gray-700 hover:bg-gray-600 text-white text-xs px-3 py-1.5 rounded flex items-center gap-1.5 transition-colors"
            disabled={!data.phone}
          >
            <span>📞</span>
            <span>Phone</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const nodeTypes: NodeTypes = {
  contactNode: ContactNode,
};

// Custom Controls Component with enhanced zoom
const CustomControls: React.FC = () => {
  const { zoomIn, zoomOut, fitView, setZoom } = useReactFlow();

  const handleZoomTo = (zoom: number) => {
    setZoom(zoom);
  };

  return (
    <div className="react-flow__controls" style={{
      backgroundColor: '#374151',
      border: '1px solid #4b5563',
      borderRadius: '4px',
      padding: '8px',
      display: 'flex',
      flexDirection: 'column',
      gap: '4px'
    }}>
      <button
        onClick={zoomIn}
        className="react-flow__controls-button"
        style={{
          background: 'transparent',
          border: 'none',
          color: 'white',
          padding: '8px',
          cursor: 'pointer',
          borderRadius: '2px'
        }}
        title="Zoom In"
      >
        +
      </button>
      <button
        onClick={zoomOut}
        className="react-flow__controls-button"
        style={{
          background: 'transparent',
          border: 'none',
          color: 'white',
          padding: '8px',
          cursor: 'pointer',
          borderRadius: '2px'
        }}
        title="Zoom Out"
      >
        −
      </button>
      <button
        onClick={() => fitView({ padding: 0.3 })}
        className="react-flow__controls-button"
        style={{
          background: 'transparent',
          border: 'none',
          color: 'white',
          padding: '8px',
          cursor: 'pointer',
          borderRadius: '2px'
        }}
        title="Fit View"
      >
        📐
      </button>
      <div style={{ borderTop: '1px solid #4b5563', margin: '4px 0' }} />
      <button
        onClick={() => handleZoomTo(0.1)}
        className="react-flow__controls-button"
        style={{
          background: 'transparent',
          border: 'none',
          color: 'white',
          padding: '6px',
          cursor: 'pointer',
          borderRadius: '2px',
          fontSize: '10px'
        }}
        title="Zoom to 10%"
      >
        10%
      </button>
      <button
        onClick={() => handleZoomTo(0.25)}
        className="react-flow__controls-button"
        style={{
          background: 'transparent',
          border: 'none',
          color: 'white',
          padding: '6px',
          cursor: 'pointer',
          borderRadius: '2px',
          fontSize: '10px'
        }}
        title="Zoom to 25%"
      >
        25%
      </button>
      <button
        onClick={() => handleZoomTo(0.5)}
        className="react-flow__controls-button"
        style={{
          background: 'transparent',
          border: 'none',
          color: 'white',
          padding: '6px',
          cursor: 'pointer',
          borderRadius: '2px',
          fontSize: '10px'
        }}
        title="Zoom to 50%"
      >
        50%
      </button>
      <button
        onClick={() => handleZoomTo(1)}
        className="react-flow__controls-button"
        style={{
          background: 'transparent',
          border: 'none',
          color: 'white',
          padding: '6px',
          cursor: 'pointer',
          borderRadius: '2px',
          fontSize: '10px'
        }}
        title="Zoom to 100%"
      >
        100%
      </button>
    </div>
  );
};

const ContactsOrgChartFlow: React.FC<ContactsOrgChartProps> = ({
  contacts,
  onContactSelect,
  className = '',
  allowLinking = true,
  onLinksChange,
  persistData = true,
  storageKey = 'contacts-org-chart'
}) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [linkingMode, setLinkingMode] = useState(false);
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);

  // Load persisted data from localStorage
  const loadPersistedData = useCallback(() => {
    if (!persistData) return { nodes: [], edges: [] };
    
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const data = JSON.parse(saved);
        return {
          nodes: data.nodes || [],
          edges: data.edges || []
        };
      }
    } catch (error) {
      console.error('Error loading persisted chart data:', error);
    }
    return { nodes: [], edges: [] };
  }, [persistData, storageKey]);

  // Save data to localStorage
  const savePersistedData = useCallback((nodesToSave: Node[], edgesToSave: Edge[]) => {
    if (!persistData) return;
    
    try {
      const data = {
        nodes: nodesToSave,
        edges: edgesToSave,
        timestamp: Date.now()
      };
      localStorage.setItem(storageKey, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving chart data:', error);
    }
  }, [persistData, storageKey]);

  // Create nodes and edges from contacts with staggered positioning
  const { initialNodes, initialEdges } = useMemo(() => {
    if (contacts.length === 0) {
      return { initialNodes: [], initialEdges: [] };
    }

    const colors = ['#ef4444', '#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];
    const departments = ['Management', 'Sales', 'Marketing', 'Production', 'IT', 'HR'];
    
    // Create hierarchical structure first
    const hierarchy: { [key: string]: Contact[] } = {};
    const rootContact = contacts[0];
    hierarchy[rootContact.contactId || 'root'] = [];
    
    // Create a more balanced tree structure
    if (contacts.length > 1) {
      const sortedContacts = [...contacts].sort((a, b) => a.name.localeCompare(b.name));
      const root = sortedContacts[0];
      const remainingContacts = sortedContacts.slice(1);
      
      const maxBranches = Math.min(4, Math.ceil(Math.sqrt(remainingContacts.length)));
      const contactsPerBranch = Math.ceil(remainingContacts.length / maxBranches);
      
      // Create hierarchical levels
      for (let i = 0; i < remainingContacts.length; i++) {
        const contact = remainingContacts[i];
        let parentContact: Contact | null = null;
        
        if (i < contactsPerBranch) {
          parentContact = root;
        } else if (i < contactsPerBranch * 2) {
          const branchLeaderIndex = Math.floor((i - contactsPerBranch) / Math.ceil(contactsPerBranch / 2));
          parentContact = remainingContacts[branchLeaderIndex] || root;
        } else {
          const grandParentIndex = Math.floor((i - contactsPerBranch * 2) / 2);
          const parentIndex = contactsPerBranch + grandParentIndex;
          if (parentIndex < remainingContacts.length) {
            parentContact = remainingContacts[parentIndex];
          } else {
            parentContact = root;
          }
        }
        
        if (parentContact && parentContact.contactId !== contact.contactId) {
          const parentKey = parentContact.contactId || 'root';
          if (!hierarchy[parentKey]) {
            hierarchy[parentKey] = [];
          }
          hierarchy[parentKey].push(contact);
        }
      }
    }
    
    // Calculate positions with staggering
    const nodePositions: { [key: string]: { x: number; y: number; level: number } } = {};
    const nodeWidth = 320; // Width of each node including spacing
    const nodeHeight = 140; // Height of each node including spacing
    const horizontalSpacing = 80; // Increased horizontal spacing
    const verticalSpacing = 120; // Increased vertical spacing
    
    // Position nodes level by level with better distribution
    const positionNodes = (parentId: string, level: number, startX: number) => {
      const children = hierarchy[parentId] || [];
      if (children.length === 0) return startX;
      
      // Better spacing calculation
      const totalWidth = children.length * nodeWidth + (children.length - 1) * horizontalSpacing;
      const startXAdjusted = startX - totalWidth / 2;
      
      children.forEach((child, index) => {
        const childId = child.contactId || `contact-${contacts.indexOf(child)}`;
        const x = startXAdjusted + index * (nodeWidth + horizontalSpacing) + nodeWidth / 2;
        const y = level * verticalSpacing;
        
        nodePositions[childId] = { x, y, level };
        
        // Recursively position children with better centering
        positionNodes(childId, level + 1, x);
      });
      
      return startX;
    };
    
    // Start positioning from root
    const rootId = rootContact.contactId || 'root';
    nodePositions[rootId] = { x: 600, y: 0, level: 0 }; // Center the root more
    positionNodes(rootId, 1, 600);
    
    // Load persisted positions
    const persistedData = loadPersistedData();
    const persistedPositions: { [key: string]: { x: number; y: number } } = {};
    persistedData.nodes.forEach(node => {
      persistedPositions[node.id] = { x: node.position.x, y: node.position.y };
    });
    
    // Create nodes with calculated or persisted positions
    const nodes: Node[] = contacts.map((contact, index) => {
      const name = contact.name || 'Unknown';
      const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
      const department = departments[index % departments.length];
      const contactId = contact.contactId || `contact-${index}`;
      
      // Use persisted position if available, otherwise use calculated position
      const persistedPosition = persistedPositions[contactId];
      const calculatedPosition = nodePositions[contactId] || { x: index * (nodeWidth + horizontalSpacing), y: 0 };
      const position = persistedPosition || calculatedPosition;
      
      return {
        id: contactId,
        type: 'contactNode',
        position: { x: position.x, y: position.y },
        data: {
          contact,
          name,
          title: contact.description || 'Contact',
          department,
          initials: initials.substring(0, 2),
          color: colors[index % colors.length],
          email: contact.email || '',
          phone: contact.phone || '',
        },
      };
    });

    // Create hierarchical edges
    const hierarchicalEdges: Edge[] = [];
    
    Object.entries(hierarchy).forEach(([parentId, children]) => {
      children.forEach((child) => {
        const childId = child.contactId || `contact-${contacts.indexOf(child)}`;
        const sourceId = parentId === 'root' ? rootContact.contactId || `contact-${contacts.indexOf(rootContact)}` : parentId;
        
        hierarchicalEdges.push({
          id: `${sourceId}-${childId}`,
          source: sourceId,
          target: childId,
          type: 'smoothstep',
          style: { stroke: '#6b7280', strokeWidth: 2 },
          animated: false,
        });
      });
    });

    // Merge with persisted edges, keeping custom links
    const persistedEdges = persistedData.edges || [];
    const customLinks = persistedEdges.filter(edge => edge.label === 'Custom Link');
    const edges = [...hierarchicalEdges, ...customLinks];

    return { initialNodes: nodes, initialEdges: edges };
  }, [contacts]);

  // Update nodes and edges when contacts change
  React.useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [initialNodes, initialEdges, setNodes, setEdges]);

  // Auto-save when nodes or edges change
  React.useEffect(() => {
    if (nodes.length > 0 || edges.length > 0) {
      savePersistedData(nodes, edges);
    }
  }, [nodes, edges, savePersistedData]);

  const onConnect = useCallback(
    (params: Connection) => {
      if (!allowLinking) return;
      
      const newEdge = {
        ...params,
        id: `${params.source}-${params.target}`,
        type: 'smoothstep',
        style: { stroke: '#10b981', strokeWidth: 2 },
        animated: false,
        label: 'Custom Link',
        labelStyle: { fill: '#10b981', fontWeight: 600 },
        labelBgStyle: { fill: '#1a1d2e', fillOpacity: 0.8 },
      };
      
      setEdges((eds) => addEdge(newEdge, eds));
      
      // Notify parent component of link changes
      if (onLinksChange) {
        const allEdges = [...edges, newEdge];
        const customLinks = allEdges
          .filter(edge => edge.label === 'Custom Link')
          .map(edge => ({
            from: edge.source,
            to: edge.target,
            label: edge.label
          }));
        onLinksChange(customLinks);
      }
    },
    [allowLinking, setEdges, edges, onLinksChange],
  );

  const onNodeClick = useCallback(
    (event: React.MouseEvent, node: Node) => {
      if (linkingMode && allowLinking) {
        // Handle linking mode
        setSelectedNodes(prev => {
          if (prev.includes(node.id)) {
            return prev.filter(id => id !== node.id);
          } else if (prev.length < 2) {
            return [...prev, node.id];
          } else {
            // Replace the first selected node
            return [prev[1], node.id];
          }
        });
        event.stopPropagation();
      } else {
        // Normal node selection
        if (onContactSelect && node.data?.contact) {
          onContactSelect(node.data.contact);
        }
      }
    },
    [linkingMode, allowLinking, onContactSelect],
  );

  const handleLinkNodes = useCallback(() => {
    if (selectedNodes.length === 2) {
      const [source, target] = selectedNodes;
      const connection = {
        source,
        target,
        sourceHandle: null,
        targetHandle: null,
      };
      onConnect(connection);
      setSelectedNodes([]);
      setLinkingMode(false);
    }
  }, [selectedNodes, onConnect]);

  const handleDeleteEdge = useCallback((edgeId: string) => {
    setEdges(edges => {
      const newEdges = edges.filter(edge => edge.id !== edgeId);
      
      // Notify parent component of link changes
      if (onLinksChange) {
        const customLinks = newEdges
          .filter(edge => edge.label === 'Custom Link')
          .map(edge => ({
            from: edge.source,
            to: edge.target,
            label: edge.label
          }));
        onLinksChange(customLinks);
      }
      
      return newEdges;
    });
  }, [setEdges, onLinksChange]);

  const onEdgeClick = useCallback((event: React.MouseEvent, edge: Edge) => {
    if (allowLinking && edge.label === 'Custom Link') {
      if (confirm('Delete this custom link?')) {
        handleDeleteEdge(edge.id);
      }
      event.stopPropagation();
    }
  }, [allowLinking, handleDeleteEdge]);

  const handleResetLayout = useCallback(() => {
    if (confirm('Reset chart layout and clear all custom links? This cannot be undone.')) {
      localStorage.removeItem(storageKey);
      window.location.reload(); // Simple way to reset everything
    }
  }, [storageKey]);

  if (contacts.length === 0) {
    return (
      <div className={`ui-contacts-org-chart ${className}`}>
        <div className="flex items-center justify-center h-96 bg-gray-800 border border-gray-600 rounded-lg">
          <div className="text-center">
            <div className="text-gray-400 text-4xl mb-2">📊</div>
            <p className="text-gray-300">No contacts to display in chart</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`ui-contacts-org-chart ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-600">
          Showing {contacts.length} contact{contacts.length !== 1 ? 's' : ''}
        </div>
        <div className="flex items-center gap-4">
          {allowLinking && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLinkingMode(!linkingMode)}
                className={`px-3 py-1 text-sm rounded border transition ${
                  linkingMode 
                    ? 'bg-green-600 text-white border-green-600' 
                    : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                }`}
              >
                {linkingMode ? '🔗 Linking Mode' : '🔗 Link Contacts'}
              </button>
              
              {linkingMode && selectedNodes.length === 2 && (
                <button
                  onClick={handleLinkNodes}
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded border border-blue-600 hover:bg-blue-700 transition"
                >
                  Create Link
                </button>
              )}
              
              {linkingMode && selectedNodes.length > 0 && (
                <button
                  onClick={() => {
                    setSelectedNodes([]);
                    setLinkingMode(false);
                  }}
                  className="px-3 py-1 text-sm bg-gray-500 text-white rounded border border-gray-500 hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
              )}
              
              <button
                onClick={handleResetLayout}
                className="px-3 py-1 text-sm bg-red-600 text-white rounded border border-red-600 hover:bg-red-700 transition"
                title="Reset layout and clear custom links"
              >
                🔄 Reset
              </button>
            </div>
          )}
          
          <div className="text-xs text-gray-500">
            {linkingMode 
              ? `Select ${selectedNodes.length < 2 ? '2 contacts to link' : 'contacts to link'}`
              : 'Click nodes to view details • Drag to pan • Scroll to zoom'
            }
          </div>
        </div>
      </div>
      
      <div 
        style={{ 
          width: '100%', 
          height: '800px', 
          border: '1px solid #374151', 
          borderRadius: '8px',
          backgroundColor: '#2a2d3a'
        }}
      >
        <ReactFlow
          nodes={nodes.map(node => ({
            ...node,
            style: {
              ...node.style,
              border: selectedNodes.includes(node.id) 
                ? '2px solid #10b981' 
                : linkingMode 
                  ? '2px dashed #6b7280' 
                  : 'none'
            }
          }))}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onEdgeClick={onEdgeClick}
          nodeTypes={nodeTypes}
          connectionMode={ConnectionMode.Loose}
          fitView
          fitViewOptions={{
            padding: 0.3,
            includeHiddenNodes: false,
            minZoom: 0.05,
            maxZoom: 3,
          }}
          minZoom={0.05}
          maxZoom={3}
          defaultZoom={0.8}
          defaultEdgeOptions={{
            style: { stroke: '#6b7280', strokeWidth: 2 },
            type: 'smoothstep',
          }}
          proOptions={{ hideAttribution: true }}
        >
          <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#374151" />
          <Controls 
            style={{
              backgroundColor: '#374151',
              border: '1px solid #4b5563',
            }}
            showZoom={true}
            showFitView={true}
            showInteractive={false}
            position="top-left"
          />
        </ReactFlow>
      </div>
    </div>
  );
};

export const ContactsOrgChartReactFlow: React.FC<ContactsOrgChartProps> = (props) => (
  <ReactFlowProvider>
    <ContactsOrgChartFlow {...props} />
  </ReactFlowProvider>
);
