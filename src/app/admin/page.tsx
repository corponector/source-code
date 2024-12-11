import { getServerSession } from 'next-auth';
import { Col, Row, Table, Button } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import { adminProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import { getUserCount, getJobPostingCount} from '@/lib/dbActions';
import EditRoleButton from '@/components/RoleEditButton';
import DeleteUserButton from '@/components/DeleteUserButton';
import { getJobListings } from '@/lib/dbActions'; 


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
  const jobListings = await getJobListings();  
  

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
                      <td>
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <EditRoleButton user={user} />
                          <DeleteUserButton userId={user.id} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </section>
          </div>
        </Col>
      </Row>

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
                      <td>{listing.company.name}</td>
                      <td>{listing.company.location}</td>
                      <td>{listing.company.emails}</td> 
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
