import { getServerSession } from 'next-auth';
import { Col, Row, Table, Button } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import { adminProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import { getUserCount, getJobPostingCount } from '@/lib/dbActions';

const AdminPage = async () => {
  const session = await getServerSession(authOptions);
  adminProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  const users = await prisma.user.findMany({});
  const activeUsers = await getUserCount();
  const jobs = await getJobPostingCount();
  // filler data

  const recentActivities = [
    { type: 'job', text: 'New job posted: Senior Developer', timestamp: '2 minutes ago' },
    { type: 'login', text: 'User login: john.doe@example.com', timestamp: '5 minutes ago' },
    { type: 'flag', text: 'Content flagged for review: inappropriate language', timestamp: '10 minutes ago' },
    { type: 'job', text: 'New job posted: UX/UI Designer', timestamp: '12 minutes ago' },
    { type: 'login', text: 'User login: jane.smith@example.com', timestamp: '20 minutes ago' },
  ];

  const jobListings = [
    { id: '1',
      title: 'Software Engineer',
      companyName: 'Tech Corp',
      location: 'San Francisco',
      userEmail: 'admin@tech.com' },
    { id: '2', title: 'Product Manager', companyName: 'Biz Inc.', location: 'New York', userEmail: 'manager@biz.com' },
  ];

  return (
    <main>
      {/* Admin Dashboard Header */}
      <Row className="mb-4" style={{ paddingTop: '50px' }}>
        <Col className="text-center">
          <h1>Admin Dashboard</h1>
          <p className="text-muted">
            Welcome, Manage your platform below.
          </p>
        </Col>
      </Row>

      {/* Admin Analytics Section */}
      <div className="mb-4">
        <div className="shadow-sm p-4 bg-white rounded">
          <div className="bg-info text-white p-3 rounded">
            <h3>Platform Analytics</h3>
          </div>
          <div className="p-3">
            <div className="d-flex justify-content-around">
              {/* Active Users Card */}
              <div className="text-center bg-light p-3 rounded" style={{ flex: 1 }}>
                <h5>Active Users</h5>
                <p>{activeUsers}</p>
              </div>

              {/* Job Postings Card */}
              <div className="text-center bg-light p-3 rounded" style={{ flex: 1 }}>
                <h5>Job Postings</h5>
                <p>{jobs}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Feed Section */}
      <div className="mt-4">
        <div className="shadow-sm p-4 bg-white rounded">
          <div className="bg-info text-white p-3 rounded">
            <h3>Recent Activities</h3>
          </div>
          <div className="p-3">
            <div>
              {recentActivities.map((activity) => (
                <div key={activity.text} className="d-flex align-items-center mb-3">
                  <div>
                    <p>{activity.text}</p>
                    <span className="text-muted">{activity.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Job Listings Management Section */}
      <Row className="mb-4">
        <Col>
          <div className="shadow-sm p-4 bg-white rounded">
            <header className="bg-primary text-white p-3 rounded">
              <h3>Job Listings</h3>
            </header>
            <section className="p-3">
              <Table responsive striped bordered hover>
                <thead>
                  <tr>
                    <th>Job Title</th>
                    <th>Company</th>
                    <th>Location</th>
                    <th>Posted By</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {jobListings.map((listing) => (
                    <tr key={listing.id}>
                      <td>{listing.title}</td>
                      <td>{listing.companyName}</td>
                      <td>{listing.location}</td>
                      <td>{listing.userEmail}</td>
                      <td>
                        <Button variant="danger">Delete</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Button className="mt-3" variant="success">
                Add New Job Listing
              </Button>
            </section>
          </div>
        </Col>
      </Row>

      {/* Users Management Section */}
      <Row className="mb-4">
        <Col>
          <div className="shadow-sm p-4 bg-white rounded">
            <header className="bg-success text-white p-3 rounded">
              <h3>List of Users</h3>
            </header>
            <section className="p-3">
              <Table responsive striped bordered hover>
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Button className="mt-3" variant="info">
                Add New User
              </Button>
            </section>
          </div>
        </Col>
      </Row>

      {/* Permissions and Roles Section */}
      <Row className="mb-4">
        <Col>
          <div className="shadow-sm p-4 bg-white rounded">
            <header className="bg-info text-white p-3 rounded">
              <h3>Permissions and Roles</h3>
            </header>
            <section className="p-3">
              <Table responsive striped bordered hover>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td><Button variant="warning">Edit Role</Button></td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </section>
          </div>
        </Col>
      </Row>

      {/* Content Moderation Section */}
      <Row className="mb-4">
        <Col>
          <div className="shadow-sm p-4 bg-white rounded">
            <header className="bg-warning text-white p-3 rounded">
              <h3>Content Moderation</h3>
            </header>
            <section className="p-3">
              <Table responsive striped bordered hover>
                <thead>
                  <tr>
                    <th>Content</th>
                    <th>Flagged By</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Example Post 1</td>
                    <td>User1</td>
                    <td><Button variant="danger">Delete</Button></td>
                  </tr>
                  <tr>
                    <td>Example Post 2</td>
                    <td>User2</td>
                    <td><Button variant="danger">Delete</Button></td>
                  </tr>
                </tbody>
              </Table>
            </section>
          </div>
        </Col>
      </Row>

      {/* Category Management Section */}
      <Row className="mb-4">
        <Col>
          <div className="shadow-sm p-4 bg-white rounded">
            <header className="bg-dark text-white p-3 rounded">
              <h3>Category and Tag Management</h3>
            </header>
            <section className="p-3">
              <div className="d-flex justify-content-between mb-3">
                <Button className="mt-3" variant="primary">
                  Add New Category
                </Button>
                <Button className="mt-3 ms-3" variant="secondary">
                  Manage Tags
                </Button>
              </div>

              {/* Categories List (Example) */}
              <h5>Existing Categories</h5>
              <Table responsive striped bordered hover>
                <thead>
                  <tr>
                    <th>Category Name</th>
                    <th>Posts Count</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Skills</td>
                    <td>10 Posts</td>
                    <td>
                      <Button variant="warning" size="sm">Edit</Button>
                      <Button variant="danger" size="sm" className="ms-2">Delete</Button>
                    </td>
                  </tr>
                  <tr>
                    <td>Geographic Locations</td>
                    <td>5 Posts</td>
                    <td>
                      <Button variant="warning" size="sm">Edit</Button>
                      <Button variant="danger" size="sm" className="ms-2">Delete</Button>
                    </td>
                  </tr>
                  <tr>
                    <td>Position Types</td>
                    <td>8 Posts</td>
                    <td>
                      <Button variant="warning" size="sm">Edit</Button>
                      <Button variant="danger" size="sm" className="ms-2">Delete</Button>
                    </td>
                  </tr>
                  <tr>
                    <td>Industries</td>
                    <td>12 Posts</td>
                    <td>
                      <Button variant="warning" size="sm">Edit</Button>
                      <Button variant="danger" size="sm" className="ms-2">Delete</Button>
                    </td>
                  </tr>
                  {/* More categories */}
                </tbody>
              </Table>

              {/* Tags List (Example) */}
              <h5>Existing Tags</h5>
              <Table responsive striped bordered hover>
                <thead>
                  <tr>
                    <th>Tag Name</th>
                    <th>Assigned Posts</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>JavaScript</td>
                    <td>4 Posts</td>
                    <td>
                      <Button variant="warning" size="sm">Edit</Button>
                      <Button variant="danger" size="sm" className="ms-2">Delete</Button>
                    </td>
                  </tr>
                  <tr>
                    <td>Python</td>
                    <td>3 Posts</td>
                    <td>
                      <Button variant="warning" size="sm">Edit</Button>
                      <Button variant="danger" size="sm" className="ms-2">Delete</Button>
                    </td>
                  </tr>
                  <tr>
                    <td>React</td>
                    <td>2 Posts</td>
                    <td>
                      <Button variant="warning" size="sm">Edit</Button>
                      <Button variant="danger" size="sm" className="ms-2">Delete</Button>
                    </td>
                  </tr>
                  <tr>
                    <td>AWS</td>
                    <td>5 Posts</td>
                    <td>
                      <Button variant="warning" size="sm">Edit</Button>
                      <Button variant="danger" size="sm" className="ms-2">Delete</Button>
                    </td>
                  </tr>
                  <tr>
                    <td>Data Science</td>
                    <td>6 Posts</td>
                    <td>
                      <Button variant="warning" size="sm">Edit</Button>
                      <Button variant="danger" size="sm" className="ms-2">Delete</Button>
                    </td>
                  </tr>
                  {/* More tags */}
                </tbody>
              </Table>
            </section>
          </div>
        </Col>
      </Row>

      {/* Notifications Section */}
      <Row className="mb-4">
        <Col>
          <div className="shadow-sm p-4 bg-white rounded">
            <header className="bg-danger text-white p-3 rounded">
              <h3>Send Notifications</h3>
            </header>
            <section className="p-3">
              {/* Notification Content Input Field */}
              <div className="mb-3">
                {/* <label htmlFor="notificationMessage" className="form-label">Notification Message</label> */}
                <p>Notification Message</p>
                <textarea
                  id="notificationMessage"
                  className="form-control"
                  placeholder="Enter your notification message here"
                />
              </div>

              {/* Send Notification Button */}
              <Button className="mt-3" variant="danger">
                Send Site-Wide Notification
              </Button>
            </section>
          </div>
        </Col>
      </Row>

    </main>
  );
};

export default AdminPage;
